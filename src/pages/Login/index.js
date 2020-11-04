import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <Container>
      <h1>LOGIN</h1>
      <LoginForm />
      <Link to={"/register"}>Cadastre-se</Link>
    </Container>
  );
}
