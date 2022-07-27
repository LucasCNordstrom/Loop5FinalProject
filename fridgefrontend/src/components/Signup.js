import '../CSS/Login.css';
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import { getAuth, updateProfile } from "firebase/auth";
import BounceLoader from "react-spinners/BounceLoader";

const auth = getAuth();

const Signup = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useUserAuth();
  const { user } = useUserAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  },[user])

  if(user === undefined) return (<BounceLoader className="loader" size={150} color="white" /> ) 

  updateProfile(auth.currentUser, {
    displayName: name
  }).catch((error) => {
    console.log(error);
  });

  return (
    <>
      <div className='login'>
        <img alt="Signup-icon" src='https://cdn-icons-png.flaticon.com/512/748/748137.png' />
        <h2>Sign up for Twerp</h2>
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

          <div>
            <Button variant="primary" type="Submit" className="page-button" onClick={updateProfile}>
              Sign up
            </Button>
          </div>
        </Form>
        <div>
        Already have an account? <Link to="/login">Log In</Link>
        </div>
      </div>
    </>
  );
};

export default Signup;