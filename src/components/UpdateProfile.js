import React, { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const promises = [];
    setLoading(true);

    if (emailRef.current.value !== currentUser.email) {
      console.log(currentUser.email);
      console.log(emailRef.current.value);
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      console.log(passwordRef.current.value);
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        navigate("/");
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <>
      <div>
        <h2>Update Profile</h2>
        {currentUser?.email}
        <form onSubmit={handleSubmit}>
          <input
            ref={emailRef}
            type="email"
            required
            placeholder="Email"
            defaultValue={currentUser.email}
          ></input>
          <input
            ref={passwordRef}
            type="password"
            placeholder="Leave Blank to keep the same"
          ></input>
          <button disabled={loading} type="submit">
            Update
          </button>
        </form>
      </div>
      <div>
        <Link to="/">Cancel</Link>
      </div>
    </>
  );
}
