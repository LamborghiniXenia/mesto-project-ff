import './pages/index.css';
import {createCard, deleteCard, likesButton} from './components/card';
import {initialCards} from './components/cards';
import {openModal, closeModal} from './components/modal';

const cardsContainer = document.querySelector('.places__list');
const popupEditProfile = document.querySelector('.popup_type_edit');
const editOpen = document.querySelector('.profile__edit-button');
const editClose = popupEditProfile.querySelector('.popup__close');
const popupAddCard = document.querySelector('.popup_type_new-card');
const addOpen = document.querySelector('.profile__add-button');
const addClose = popupAddCard.querySelector('.popup__close');
const previewPopup = document.querySelector('.popup_type_image');
const previewClose = previewPopup.querySelector('.popup__close');
const popupImage = previewPopup.querySelector('.popup__image');
const popupCaption = previewPopup.querySelector('.popup__caption');

initialCards.forEach(function (arr) {
    cardsContainer.append(createCard(arr, deleteCard, createPreview, likesButton ))
});

editOpen.addEventListener('click', () => openModal(popupEditProfile));
editClose.addEventListener('click', () => closeModal(popupEditProfile));
addOpen.addEventListener('click', () => openModal(popupAddCard));
addClose.addEventListener('click', () => closeModal(popupAddCard));
previewClose.addEventListener('click', () => closeModal(previewPopup));

const formEditProfile = popupEditProfile.querySelector('.popup__form');
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
nameInput.value = profileTitle.textContent;
jobInput.value = profileDescription.textContent;


function createPreview(e) {
    popupImage.alt = e.target.getAttribute('alt');
    popupImage.src = e.target.getAttribute('src');
    popupCaption.textContent = e.target.getAttribute('alt');
    openModal(previewPopup);
};


function submitEditProfileForm(e) {
    e.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(popupEditProfile);
};

formEditProfile.addEventListener('submit', submitEditProfileForm);


const formAddCard = popupAddCard.querySelector('.popup__form');
const placeInput = formAddCard.querySelector('.popup__input_type_card-name');
const urlInput = formAddCard.querySelector('.popup__input_type_url');

function handleCardSubmit(e) {
    e.preventDefault();
    const newInitialCard = {name: placeInput.value, link: urlInput.value};
    cardsContainer.prepend(createCard(newInitialCard, deleteCard, createPreview, likesButton));
    formAddCard.reset();
    closeModal(popupAddCard);
}

formAddCard.addEventListener('submit', handleCardSubmit);