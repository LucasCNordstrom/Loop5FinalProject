import '../CSS/Login.css';
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../context/UserAuthContext";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();
  const { user } = useUserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/home");
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(user);

  // if (user) {
  //   return <Navigate to="home" />;
  // }

  return (
    <>
      <div className="login">
      <img alt="Login-icon" src='https://cdn-icons-png.flaticon.com/512/1000/1000997.png'/>
        <h2 className='width'>Login to Twerp</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <div >
            <Button variant="primary" type="Submit" className="page-button">
              Log In
            </Button>
          </div>
        </Form>
        <hr />
        <div className="googleBtn">
          <GoogleButton
            type="dark"
            onClick={handleGoogleSignIn}
          />
        </div>
        <div>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
      </div>
    </>
  );
};

export default Login;