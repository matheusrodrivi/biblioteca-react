import React, { useState } from 'react';
import './AddBook.css';
import { db } from '../../firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function AddBookForm() {
  const [bookName, setBookName] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!bookName || !price || !imageUrl || !author) {
      setMessage({ text: 'Favor preencher os campos', type: 'error' });
      return;
    }

    try {
        const docRef = await addDoc(collection(db, "livro"), {
            name: bookName,
            price: parseFloat(price),
            imageUrl: imageUrl,
            author: author
        });

        if (docRef.id) {
            setMessage({ text: 'Livro adicionado com sucesso!', type: 'success' });
            
            // Reset form
            setBookName('');
            setPrice('');
            setImageUrl('');
            setAuthor('');
        }
    } catch (error) {
      setMessage({ text: 'Erro ao adicionar o livro.', type: 'error' });
    }
  };

  return (
    <div className="add-book-form-container">
      <form onSubmit={handleSubmit} className="add-book-form">
        <h2>Adicionar um novo livro</h2>
        
        <div className="form-group">
          <label htmlFor="bookName">Nome</label>
          <input
            id="bookName"
            type="text"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            placeholder="Digite o nome do livro"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Autor</label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Digite o nome do autor"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="price">Preço</label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Digite o preço do livro"
            step="0.01"
            min="0"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="imageUrl">URL da imagem</label>
          <input
            id="imageUrl"
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Digite o URL da imagem"
            required
          />
        </div>
        
        <button type="submit">Adicionar</button>

        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}
      </form>
    </div>
  );
}