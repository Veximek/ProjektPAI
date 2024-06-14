import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './styles.module.css';
import { useLocation, useNavigate } from 'react-router-dom'
const EditBook = ({ }) => {
  const location = useLocation()
  const [id, setId] = useState(location.state.id);
  const [title, setTitle] = useState(location.state.title);
  const [author, setAuthor] = useState(location.state.author);
  const [description, setDescription] = useState(location.state.description);
  const [message, setMessage] = useState('');
  const editBook = ""
  const navigate = useNavigate()
  useEffect(() => {

    setTitle(location.state.titl);
    setAuthor(location.state.author);
    setDescription(location.state.description);

  }, [editBook]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const newBook = { title, author, description };
    try {
      await axios.put(`http://localhost:8080/api/books/${id}`, newBook, {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
      });
      setMessage('Book updated successfully!');
      setTitle('');
      setAuthor('');
      setDescription('');
    } catch (error) {
      setMessage('Failed to submit book: ' + error.response.data.message);
    }
  };
  const handleComeback = () => {
    const path = "/"
    navigate(path)
  }

  return (
    <div className={styles.container}>
      <h2>{'Edit Book'}</h2>
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
          <button type="submit">{'Update Book'}</button>
          <button type="submit" onClick={handleComeback}>Main Page</button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default EditBook;
