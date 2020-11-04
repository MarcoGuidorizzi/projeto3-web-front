import { REACT_APP_SERVER_HOST } from "../constants";

export const registerRequest = (user) => {
  return fetch(`${REACT_APP_SERVER_HOST}/users`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
};
