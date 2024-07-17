import './pages/index.css';
import {createCard, deleteCard, createPreview, likesButton} from './components/card';
import {initialCards} from './components/cards';
import {openModal, closeModal} from './components/modal';

const cardsContainer = document.querySelector('.places__list');
const editPopup = document.querySelector('.popup_type_edit');
const editOpen = document.querySelector('.profile__edit-button');
const editClose = editPopup.querySelector('.popup__close');
const addPopup = document.querySelector('.popup_type_new-card');
const addOpen = document.querySelector('.profile__add-button');
const addClose = addPopup.querySelector('.popup__close');
const previewPopup = document.querySelector('.popup_type_image');
const previewClose = previewPopup.querySelector('.popup__close');

initialCards.forEach(function (arr) {
    cardsContainer.append(createCard(arr, deleteCard, createPreview, likesButton ))
});

editOpen.addEventListener('click', () => openModal(editPopup));
editClose.addEventListener('click', () => closeModal(editPopup));
addOpen.addEventListener('click', () => openModal(addPopup));
addClose.addEventListener('click', () => closeModal(addPopup));
previewClose.addEventListener('click', () => closeModal(previewPopup));

const formElement = editPopup.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
nameInput.value = profileTitle.textContent;
jobInput.value = profileDescription.textContent;

function handleFormSubmit(e) {
    e.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(editPopup);
};

formElement.addEventListener('submit', handleFormSubmit);


const addElement = addPopup.querySelector('.popup__form');
const placeInput = addElement.querySelector('.popup__input_type_card-name');
const urlInput = addElement.querySelector('.popup__input_type_url');

function handleCardSubmit(e) {
    e.preventDefault();
    const newInitialCard = {name: placeInput.value, link: urlInput.value};
    cardsContainer.prepend(createCard(newInitialCard, deleteCard, createPreview, likesButton));
    placeInput.value ="";
    urlInput.value = "";
    closeModal(addPopup);
}

addElement.addEventListener('submit', handleCardSubmit);