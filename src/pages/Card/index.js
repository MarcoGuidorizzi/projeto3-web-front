import React from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { logout } from "../../services/auth";
import CardForm from "./CardForm";

export default function Login() {
  const history = useHistory();

  const onLogout = () => {
    logout();
    history.replace("/");
  };
  
  return (
    <>
      <Navbar bg="dark">
        <Link to={"/"}>
          <Button type="button" className="ml-auto">Listar Cards</Button>
        </Link>

        <Button type="button" className="ml-auto" onClick={onLogout}>
          Logout
        </Button>
      </Navbar>
      <Container>
        <h1>Card</h1>
        <CardForm />
      </Container>
    </>
  );
}
