import React from "react";
import { AuthProvider } from "../context/AuthContext";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import Overview from "./Overview";
import AddReview from "./AddReview";
import View from "./View";
import EditReview from "./EditReview";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UpdateProfile from "./UpdateProfile";

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <Routes>
            <Route exact path="/" element={<Overview></Overview>}></Route>
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/view/:id"
              element={
                <PrivateRoute>
                  <View />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/editreview/:id"
              element={
                <PrivateRoute>
                  <EditReview />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/addreview"
              element={
                <PrivateRoute>
                  <AddReview />
                </PrivateRoute>
              }
            ></Route>
            <Route
              exact
              path="/update-profile"
              element={
                <PrivateRoute>
                  <UpdateProfile />
                </PrivateRoute>
              }
            ></Route>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
