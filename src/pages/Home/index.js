import React, { useEffect, useState } from "react";
import { Navbar, Button, Form, Card, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { loadCards, searchCard } from "../../services/trello";
import { logout } from "../../services/auth";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function Home() {
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState("");
  const history = useHistory();

  useEffect(() => {
    initLoad();
  }, []);

  const initLoad = async () => {
    try {
      const response = await loadCards();
      if (response.ok) {
        let cards = await response.json();
        setCards(cards)
      } else {
        if (response.statusText === "Unauthorized") {
          onLogout()
        }
        console.error('ERROR', response);
      }
    } catch (error) {
      console.error("Tratar o erro");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (search) {
        response = await searchCard(search);
      } else {
        response = await loadCards();
      }
      if (response.ok) {
        let cards = await response.json();
        setCards(cards)
      } else {
        if (response.statusText === "Unauthorized") {
          onLogout()
        }
        console.error('ERROR', response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClear = async (e) => {
    e.preventDefault();
    setSearch("");
    await initLoad();
  };

  const onLogout = () => {
    logout();
    history.replace("/");
  };

  return (
    <>
      <Navbar bg="dark">
        <Link to={"/cadastro"}>
          <Button type="button" className="ml-auto">Adicionar Card</Button>
        </Link>

        <Button type="button" className="ml-auto" onClick={onLogout}>
          Logout
        </Button>
      </Navbar>
      <Container>

        <div className="my-3">
          <Form onSubmit={handleSubmit} className="d-flex justify-content-center align-items-center">
            <Form.Group controlId="formPesquisa" style={{ flex: 1, marginBottom: 0 }}>
              <Form.Control
                type="text"
                placeholder="Pesquisar Card"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Pesquisar
            </Button>
            <Button variant="primary" type="button" onClick={handleClear}>
              Limpar
            </Button>
          </Form>
        </div>
      </Container>
      <Container className="d-flex flex-wrap justify-content-between">
        {
          cards?.map((card) => (
            <Card style={{ width: '18rem', margin: 5 }}>
              <Card.Img variant="top" src={card.image || "https://cel.ac/wp-content/uploads/2016/02/placeholder-img-1.jpg"} />
              <Card.Body>
                <Card.Title>{card.title}</Card.Title>
                <Card.Text>{card.description}</Card.Text>
              </Card.Body>
            </Card>
          ))
        }
      </Container>

      {/* <Board data={cards} editable draggable /> */}
    </>
  );
}
