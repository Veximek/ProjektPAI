import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './BookList.module.css';
import { useNavigate } from "react-router-dom"
const BookList = (props) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/books', {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
      });
      setBooks(res.data);
    } catch (error) {
      console.error('Failed to fetch books:', error);
    }
  };
  let navigate = useNavigate()
  const handleEdit = (book) => {
    navigate('/editBook', { state: {id: book._id, title: book.title, author: book.author, description: book.description } });
  };

  const handleDelete = async (bookId) => {
    try {
      await axios.get(`http://localhost:8080/api/books/delete/${bookId}`, {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
      });
      fetchBooks();
    } catch (error) {
      console.error('Failed to delete book:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Book List</h2>
      {books.length > 0 ? (
        <ul className={styles.bookList}>
          <li className={styles.bookItem}>
            <h3>Title</h3>
            <h3>Author</h3>
            <h3>Description</h3>
            <h3>Actions</h3>
          </li>
          {books.map((book) => (
            <li key={book._id} className={styles.bookItem}>
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <p>{book.description}</p>
              <div className={styles.actions}>
                <button onClick={() => handleDelete(book._id)} className={styles.buttonDelete}>Delete</button>
                <button onClick={() => handleEdit(book)} className={styles.buttonEdit}>Edit</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No books available</p>
      )}
    </div>
  );
};

export default BookList;
