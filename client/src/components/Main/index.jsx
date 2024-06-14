import React, { useState } from 'react';
import styles from "./styles.module.css"
import { useNavigate } from "react-router-dom";
import BookList from "../BookList"
import EditBook from '../EditBook';
const Main = () => {

    const {book, setBook} = useState(null)
    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.reload()
    }
    let navigate = useNavigate()
    const handleAddBook = () => {
        const path = "/AddBook"
        navigate(path)
    }
    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <h1>BooksWorld</h1>
                <div>
                    <button className={styles.white_btn} onClick={handleAddBook}>
                        Add Book
                    </button>
                    <button className={styles.white_btn} onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </nav>
            <BookList setBook={setBook} book={book}/>
        </div>

    )
}
export default Main