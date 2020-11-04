import { REACT_APP_SERVER_HOST } from "../constants";
import { getToken } from "./auth";

export const searchCard = (search) => {
  if (search.trim().length < 3) {
    throw new Error("Necessário ao menos 3 caracteres para realizar a pesquisa");
  }
  const token = getToken();
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  return fetch(`${REACT_APP_SERVER_HOST}/cards?search=${search}`, {
    method: "GET",
    headers
  })
};

export const loadCards = () => {
  const token = getToken();
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  return fetch(`${REACT_APP_SERVER_HOST}/cards`, {
    method: "GET",
    headers
  })
}

export const registerCards = async ({ title, description, image }) => {
  let img = {}
  const token = getToken();
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  if (image) {
    const data = new FormData()
    data.append('file', image)
    try {
      const response = await fetch(`${REACT_APP_SERVER_HOST}/upload`, {
        method: 'POST',
        body: data,
        headers
      })
      img = await response.json()
    } catch (error) {
      throw error;
    }
  }

  headers.append("Content-Type", `application/json`);
  headers.append("Accept", `application/json`);
  return fetch(`${REACT_APP_SERVER_HOST}/cards`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      title,
      description,
      image: img.filePath
    }),
  })
}
