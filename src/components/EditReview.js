import React, { useRef, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function EditReview() {
  const [book, setBook] = useState();
  const { id } = useParams();
  const nameRef = useRef();
  const authorRef = useRef();
  const scoreRef = useRef();
  const reviewRef = useRef();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const bookDoc = doc(db, "books", id);
    const getBooks = async () => {
      const data = await getDoc(bookDoc);

      setBook(data.data());
    };

    getBooks();
  });

  const editBook = async (e) => {
    e.preventDefault();

    const bookDoc = doc(db, "books", id);
    await updateDoc(bookDoc, {
      name: nameRef.current.value,
      author: authorRef.current.value,
      score: scoreRef.current.value,
      review: reviewRef.current.value,
      editedBy: currentUser.email,
    });

    navigate("/");
  };

  return (
    <>
      <h1>Edit the Review</h1>
      <form onSubmit={editBook}>
        <input
          ref={nameRef}
          type="text"
          defaultValue={book ? book.name : ""}
        ></input>
        <input
          ref={authorRef}
          type="text"
          defaultValue={book ? book.author : ""}
        ></input>
        <select ref={scoreRef}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
        <input
          ref={reviewRef}
          type="textarea"
          defaultValue={book ? book.review : ""}
          rows="5"
          cols="50"
        ></input>
        <button type="submit">Edit Review</button>
      </form>

      <Link to="/">
        <button>Back</button>
      </Link>
    </>
  );
}
