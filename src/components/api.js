const PATH = "https://mesto.nomoreparties.co/v1/wff-cohort-24";
const token = "f3ae17ea-d122-4bb3-99b6-efebe9cc3081";

const handleResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(response.status);
};

const getProfileData = () => {
  return fetch(PATH + "/users/me", {
    headers: {
      authorization: token,
    },
  }).then(handleResponse);
};

const getCards = () => {
  return fetch(PATH + "/cards", {
    headers: {
      authorization: token,
    },
  }).then(handleResponse);
};

const patchProfile = (profileInfo) => {
  return fetch(PATH + "/users/me", {
    method: "PATCH",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: profileInfo.name,
      about: profileInfo.about,
    }),
  }).then(handleResponse);
};

const postNewCard = (newCardData) => {
  return fetch(PATH + "/cards", {
    method: "POST",
    headers: {
      authorization: token,
      "CONTENT-TYPE": "application/json",
    },
    body: JSON.stringify({
      name: newCardData.name,
      link: newCardData.link,
    }),
  }).then(handleResponse);
};

const patchAvatar = (avatar) => {
  return fetch(PATH + "/users/me/avatar", {
    method: "PATCH",
    headers: {
      authorization: token,
      "CONTENT-TYPE": "application/json",
    },
    body: JSON.stringify({
      avatar: avatar,
    }),
  }).then(handleResponse);
};

const deleteCard = (card) => {
  return fetch(PATH + "/cards/" + card._id, {
    method: "DELETE",
    headers: {
      authorization: token,
    },
  }).then(handleResponse);
};

const likeCard = (card) => {
  return fetch(PATH + "/cards/likes/" + card._id, {
    method: "PUT",
    headers: {
      authorization: token,
      "CONTENT-TYPE": "application/json",
    },
    body: JSON.stringify({
      likes: card.likes,
    }),
  }).then(handleResponse);
};

const dislikeCard = (card) => {
  return fetch(PATH + "/cards/likes/" + card._id, {
    method: "DELETE",
    headers: {
      authorization: token,
    },
  }).then(handleResponse);
};

export {
  getProfileData,
  getCards,
  patchProfile,
  postNewCard,
  patchAvatar,
  deleteCard,
  likeCard,
  dislikeCard,
};
