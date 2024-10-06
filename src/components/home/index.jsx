import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Spinner } from 'phosphor-react';
import './index.css';

export default function BookSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [initialBooks, setInitialBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      const booksCollection = collection(db, 'livro');
      const booksSnapshot = await getDocs(booksCollection);
      const booksList = booksSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBooks(booksList);
      setInitialBooks(booksList);
      setLoading(false);
    };

    fetchBooks();
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term === '') {
      setBooks(initialBooks);
    } else {
      const filteredBooks = initialBooks.filter(book => 
        book.name.toLowerCase().includes(term.toLowerCase()) ||
        book.author.toLowerCase().includes(term.toLowerCase())
      );
      setBooks(filteredBooks);
    }
  };

  const formatPrice = (price) => {
    return price.toFixed(2).replace('.', ',');
  };

  return (
    <div className="container">
      <input
        type="text"
        className="search-bar"
        placeholder="Pesquise por livros..."
        value={searchTerm}
        onChange={handleSearch}
      />
      {loading ? (
        <div className='loadingDiv'>
            <Spinner size={52} />
        </div>
      ) : (
        <div className="book-list">
          {books.map(book => (
            <a key={book.id} className="book" href={`/book/${book.id}`}>
              <div className='bookTop'>
                  <h3>{book.name}</h3>
                  <p>{book.author}</p>
                  {book.imageUrl && <img className="bookImage" src={book.imageUrl} alt={book.name} />}
              </div>
              <p id='preco'>R${' ' + formatPrice(book.price)}</p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}