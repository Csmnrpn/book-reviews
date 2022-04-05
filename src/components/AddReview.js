import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function Review() {
  const nameRef = useRef();
  const authorRef = useRef();
  const scoreRef = useRef();
  const reviewRef = useRef();
  const { currentUser } = useAuth();
  const booksCollectionRef = collection(db, "books");
  const navigate = useNavigate();

  const createBook = async (e) => {
    e.preventDefault();
    await addDoc(booksCollectionRef, {
      name: nameRef.current.value,
      author: authorRef.current.value,
      score: scoreRef.current.value,
      review: reviewRef.current.value,
      createdBy: currentUser.email,
      editedBy: "",
    });

    navigate("/");
  };

  return (
    <>
      <h1>Book review adding and deleting is done here</h1>
      <form onSubmit={createBook}>
        <input
          ref={nameRef}
          type="text"
          required
          placeholder="Book Name"
        ></input>
        <input
          ref={authorRef}
          required
          type="text"
          placeholder="Book Author"
        ></input>
        <select ref={scoreRef} type="password">
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
        <input
          ref={reviewRef}
          type="textarea"
          placeholder="Book review here"
          rows="5"
          cols="50"
          required
        ></input>
        <button type="submit">Create Review</button>
      </form>

      <Link to="/">
        <button>Back</button>
      </Link>
    </>
  );
}
