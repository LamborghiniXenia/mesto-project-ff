import { openModal } from "./modal";

const cardTemplate = document.querySelector('#card-template').content;

function createCard(cardElement, removeCard, createModal, likedButton) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardTitle = card.querySelector('.card__title');
    cardTitle.textContent = cardElement.name;
    const cardImage = card.querySelector('.card__image');
    cardImage.alt = cardElement.name;
    cardImage.src = cardElement.link;
    const deleteButton = card.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', removeCard);
    cardImage.addEventListener('click', createModal);
    const likeButton = card.querySelector('.card__like-button');
    likeButton.addEventListener('click', likedButton);
    return card;
};

function deleteCard(e) {
    e.target.closest('.card').remove()
};

function likesButton (e) {
    e.target.classList.toggle('card__like-button_is-active');
};

function createPreview(e) {
    const previewPopup = document.querySelector('.popup_type_image');
    const popupImage = previewPopup.querySelector('.popup__image');
    popupImage.alt = e.target.getAttribute('alt');
    popupImage.src = e.target.getAttribute('src');
    const popupCaption = previewPopup.querySelector('.popup__caption');
    popupCaption.textContent = e.target.getAttribute('alt');
    openModal(previewPopup);
};

export { createCard, deleteCard, createPreview, likesButton };
