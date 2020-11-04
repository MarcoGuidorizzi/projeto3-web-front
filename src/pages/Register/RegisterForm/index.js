import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { login } from "../../../services/auth";
import { registerRequest } from "../../../services/register";
import { loginRequest } from "../../../services/login";

export default function LoginForm() {
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState({});

  const history = useHistory();

  const validateEmail = (email) => {
    const re = (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g);
    return re.test(String(email).toLowerCase());
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    let error = {};
    if (!user.email) {
      error = { ...error, email: "E-mail obrigatório." };
    } else if (user.email.length <= 3) {
      error = { ...errors, email: "E-mail tem que ter mais de 3 caracteres." };
    } else if (!validateEmail(user.email)) {
      error = { ...errors, email: "E-mail inválido." };
    }

    if (!user.password) {
      error = { ...error, password: "Senha obrigatório" };
    } else if (user.password.length <= 3) {
      error = { ...error, password: "Senha tem que ter mais de 3 caracteres" };
    }

    if (!error.password && !error.email) {
      try {
        const response = await registerRequest(user);

        if (response.ok) {
          await response.json();
          const loginResponse = await loginRequest(user);
          if (loginResponse.ok) {
            const loginRes = await response.json();
            login(loginRes.token);
            history.replace("/");
          } else {
            throw new Error("Você pode estar sem internet.");
          }
        } else {
          throw new Error("Você pode estar sem internet.");
        }
      } catch (error) {
        setErrors({ msg: "E-mail ou senha estão errados, tente novamente." });
      }
    } else {
      setErrors(error);
    }
  };

  return (
    <Row>
      <Col>
        <Form onSubmit={handleSignUp}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              isInvalid={!!errors.email}
              onFocus={(e) => setErrors({ ...errors, email: null })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              isInvalid={!!errors.pass}
              onFocus={(e) => setErrors({ ...errors, password: null })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          {!!errors.msg && <Form.Text>{errors.msg}</Form.Text>}
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
