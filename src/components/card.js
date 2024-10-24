function createCard(
  cardElement,
  userID,
  openPopupCardDelete,
  openImagePopup,
  likedCard
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = card.querySelector(".card__title");
  const cardImage = card.querySelector(".card__image");
  const cardLikeCounter = card.querySelector(".card__like-counter");
  let count = cardElement.likes.length;
  const deleteButton = card.querySelector(".card__delete-button");
  const likeButton = card.querySelector(".card__like-button");

  cardTitle.textContent = cardElement.name;
  cardImage.alt = cardElement.name;
  cardImage.src = cardElement.link;
  cardLikeCounter.textContent = count;
  if (cardElement.owner._id === userID) {
    deleteButton.addEventListener("click", () => {
      openPopupCardDelete(cardElement, card);
    });
  } else {
    deleteButton.remove();
  }
  cardImage.addEventListener("click", openImagePopup);
  likeButton.addEventListener("click", (e) => {
    likedCard(e, cardElement, cardLikeCounter);
  });
  return card;
}

export { createCard };
