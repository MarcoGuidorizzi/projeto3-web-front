import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import RegisterForm from "./RegisterForm";

export default function Register() {
  return (
    <Container>
      <h1>REGISTER</h1>
      <RegisterForm />
      <Link to={"/login"}>Login</Link>
    </Container>
  );
}
