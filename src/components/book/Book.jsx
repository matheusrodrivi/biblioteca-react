import React, { useState, useEffect } from 'react';
import './Book.css';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase/firebase';
import { doc, getDoc, updateDoc, collection, addDoc, Timestamp } from 'firebase/firestore';

export default function Book() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [rentals, setRentals] = useState([]);

    useEffect(() => {
        const fetchBook = async () => {
            const bookRef = doc(db, 'livro', id);
            const bookSnap = await getDoc(bookRef);

            if (bookSnap.exists()) {
                const bookData = bookSnap.data();
                setBook(bookData);
                console.log('Document data:', bookData);

                if (bookData.historicoDeAlugueis) {
                    const rentalPromises = bookData.historicoDeAlugueis.map(async (rentalId) => {
                        const rentalRef = doc(db, 'aluguel', rentalId);
                        const rentalSnap = await getDoc(rentalRef);
                        return rentalSnap.exists() ? rentalSnap.data() : null;
                    });

                    const rentalData = await Promise.all(rentalPromises);
                    setRentals(rentalData.filter(rental => rental !== null));
                    console.log('Rentals:', rentalData);
                }
            } else {
                console.log('No such document!');
            }
        };

        fetchBook();
    }, [id]);

    const handleDevolver = async () => {
        const bookRef = doc(db, 'livro', id);
        const now = Timestamp.now();

        await updateDoc(bookRef, { alugado: false });
        setBook(prevBook => ({ ...prevBook, alugado: false }));
    };

    const handleAlugar = async () => {
        const bookRef = doc(db, 'livro', id);
        const now = Timestamp.now();
        const oneWeekLater = Timestamp.fromDate(new Date(now.toDate().getTime() + 7 * 24 * 60 * 60 * 1000));
        const newRental = {
            dataInicio: now,
            dataFim: oneWeekLater,
            preco: book.price
        };

        const aluguelRef = await addDoc(collection(db, 'aluguel'), newRental);
        const historicoDeAlugueis = book.historicoDeAlugueis || [];
        await updateDoc(bookRef, {
            alugado: true,
            historicoDeAlugueis: [...historicoDeAlugueis, aluguelRef.id]
        });

        setBook(prevBook => ({
            ...prevBook,
            alugado: true,
            historicoDeAlugueis: [...historicoDeAlugueis, aluguelRef.id]
        }));
        setRentals(prevRentals => [...prevRentals, newRental]);
    };

    if (!book) {
        return <div>Loading...</div>;
    }

    const { imageUrl, name, author, price } = book;

    return (
        <div className="book-rental">
            <div className="book-details">
                <img src={imageUrl} alt={`Cover of ${name}`} className="book-cover" />
                <h2 className="book-name">{name}</h2>
                <p className="book-author">{author}</p>
                {price !== undefined ? (
                    <p className="book-price">R${' ' + price.toFixed(2)}</p>
                ) : (
                    <p className="book-price unavailable">Preço indisponível</p>
                )}
                {book.alugado ? (
                    <button className="rent-button" onClick={handleDevolver}>Devolver</button>
                ) : (
                    <button className="rent-button" onClick={handleAlugar}>Alugar</button>
                )}
            </div>
            <div className="rental-list">
                <h3>Histórico de aluguéis</h3>
                {rentals.length > 0 ? (
                    <ul>
                        {rentals.slice().reverse().map((rental, index) => (
                            <li key={index} className="rental-item">
                                <p><strong>Data de Início:</strong> {rental.dataInicio.toDate().toLocaleDateString()}</p>
                                <p><strong>Data de Fim:</strong> {rental.dataFim.toDate().toLocaleDateString()}</p>
                                <p className="rental-price">R${rental.preco.toFixed(2)}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-rentals">Nenhuma informação de aluguel disponível</p>
                )}
            </div>
        </div>
    );
}