import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function View() {
  const [book, setBook] = useState();
  const { id } = useParams();

  useEffect(() => {
    const bookDoc = doc(db, "books", id);
    const getBooks = async () => {
      const data = await getDoc(bookDoc);

      setBook(data.data());
    };

    getBooks();
  });

  return (
    <>
      <div>
        <p>Book Name: {book ? book.name : ""}</p>
        <p>Book Author: {book ? book.author : ""}</p>
        <p>Book Score: {book ? book.score : ""}</p>
        <p>Book Review: {book ? book.review : ""}</p>
        <p>Book was created by: {book ? book.createdBy : ""}</p>
        <p>
          {book
            ? book.editedBy !== ""
              ? `Book edite by ${book.editedBy}`
              : ""
            : ""}
        </p>
      </div>
      <Link to="/">Back to main</Link>
    </>
  );
}
