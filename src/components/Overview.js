import React from "react";
import style from "../css/Overview.module.css";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

export default function Overview() {
  const { currentUser, logout } = useAuth();
  const [books, setBooks] = useState([]);
  const booksCollectionRef = collection(db, "books");

  const getBooks = async () => {
    const data = await getDocs(booksCollectionRef);
    setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getBooks();
  }, []);

  async function deleteBook(id) {
    const bookDoc = doc(db, "books", id);
    await deleteDoc(bookDoc);
    getBooks();
  }

  function handleSignout(e) {
    e.preventDefault();
    logout();
  }

  return (
    <>
      <div className={style.mainContainer}>
        <header className={style.header}>
          <h1 className={style.headerName}>
            Book <span>Review</span>
          </h1>
          <div className={style.navContainer}>
            <div className={style.emailContainer}>
              <p className={style.loggedUser}>
                {currentUser ? currentUser.email : ""}
              </p>
              {currentUser ? (
                <Link to="/addreview" className={style.linkStyle}>
                  Add review
                </Link>
              ) : (
                ""
              )}
            </div>
            <div className={style.buttonsContainer}>
              {currentUser ? (
                <Link to="/dashboard" className={style.linkStyle}>
                  Profile
                </Link>
              ) : (
                <Link to="/login" className={style.linkStyle}>
                  Log In
                </Link>
              )}
              {currentUser ? (
                <button onClick={handleSignout} className={style.linkStyle}>
                  Sign Out
                </button>
              ) : (
                <Link to="/login" className={style.linkStyle}>
                  Sing Up
                </Link>
              )}
            </div>
          </div>
        </header>
        <div className={style.content}>
          {books.map((book) => {
            return (
              <div className={style.bookCard}>
                <div className={style.bookInformation}>
                  <p className={style.bookTitle}>{book.name}</p>
                  <p className={style.bookAuthor}>by {book.author}</p>
                  <p className={style.bookScore}>
                    Reviewer Score: <span>{book.score}</span>
                  </p>
                </div>

                <div className={style.bookButtons}>
                  {currentUser ? (
                    <Link to={`/editreview/${book.id}`}>Edit</Link>
                  ) : (
                    ""
                  )}
                  {currentUser ? (
                    <button
                      onClick={() => {
                        deleteBook(book.id);
                      }}
                    >
                      Delete
                    </button>
                  ) : (
                    ""
                  )}
                  {currentUser ? <Link to={`/view/${book.id}`}>View</Link> : ""}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
