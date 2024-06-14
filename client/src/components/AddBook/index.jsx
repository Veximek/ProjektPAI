import React, { useState } from 'react';
import axios from 'axios';
import styles from './styles.module.css';
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const newBook = { title, author, description };

    try {
      const res = await axios.post('http://localhost:8080/api/books', newBook);
      setMessage('Book added successfully!');
      setTitle('');
      setAuthor('');
      setDescription('');
    } catch (error) {
      setMessage('Failed to add book: ' + error.response.data.message);
    }
  };
  let navigate = useNavigate()
  const handleComeback = () => {
    const path = "/"
    navigate(path)
  }

  return (
    <div className={styles.container}>
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className={styles.buttons}>
          <button type="submit">Add Book</button>
          <button type="submit" onClick={handleComeback}>Main Page</button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddBook;
