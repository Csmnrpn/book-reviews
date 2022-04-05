import React, { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signup, currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {}

    setLoading(false);
  }

  return (
    <>
      <div>
        <h2>Sign Up</h2>
        {currentUser?.email}
        <form onSubmit={handleSubmit}>
          <input
            ref={emailRef}
            type="email"
            required
            placeholder="Email"
          ></input>
          <input
            ref={passwordRef}
            type="password"
            required
            placeholder="Password"
          ></input>
          <button disabled={loading} type="submit">
            Sign Up
          </button>
        </form>
      </div>
      <div>
        <p>
          Already have an account? <Link to="/login">Log In</Link>
        </p>
        <p>
          Back to <Link to="/">Main Page</Link>
        </p>
      </div>
    </>
  );
}
