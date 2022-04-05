import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate("/login");
    } catch {}
  }

  return (
    <>
      <div>
        <h2>{currentUser.email}'s Profile</h2>
        <p>Email:</p> {currentUser.email}
      </div>
      <div>
        <Link to="/update-profile">
          <button>Update Profile</button>
        </Link>
        <button onClick={handleLogout}>Log Out!</button>
        <Link to="/">Go back to main page</Link>
      </div>
    </>
  );
}
