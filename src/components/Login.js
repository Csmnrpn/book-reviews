import React, { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {}

    setLoading(false);
  }

  return (
    <>
      <div>
        <h2>Log In</h2>
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
            Log in
          </button>
        </form>
      </div>
      <div>
        <p>
          Need an account? <Link to="/signup">Sing Up</Link>
        </p>
        <p>
          Back to <Link to="/">Main Page</Link>
        </p>
      </div>
    </>
  );
}
