import "./pages/index.css";
import { createCard } from "./components/card";
import { openModal, closeModal } from "./components/modal";
import { enableValidation, clearValidation } from "./components/validation";
import {
  getProfileData,
  getCards,
  patchProfile,
  postNewCard,
  patchAvatar,
  deleteCard,
  likeCard,
  dislikeCard,
} from "./components/api";

const cardsContainer = document.querySelector(".places__list");

const popupEditProfile = document.querySelector(".popup_type_edit");
const buttonOpenEditProfileForm = document.querySelector(
  ".profile__edit-button"
);
const buttonCloseEditProfileForm =
  popupEditProfile.querySelector(".popup__close");

const popupAddCard = document.querySelector(".popup_type_new-card");
const buttonOpenAddCardForm = document.querySelector(".profile__add-button");
const buttonCloseAddCardForm = popupAddCard.querySelector(".popup__close");

const previewPopup = document.querySelector(".popup_type_image");
const buttonClosePreview = previewPopup.querySelector(".popup__close");
const popupImage = previewPopup.querySelector(".popup__image");
const popupCaption = previewPopup.querySelector(".popup__caption");

const popupDelete = document.querySelector(".popup_type_delete");
const buttonClosePopupDelete = popupDelete.querySelector(".popup__close");
const buttonDelete = popupDelete.querySelector(".popup__button_delete");

const popupFormEditProfile = popupEditProfile.querySelector(".popup__form");
const nameInput = popupFormEditProfile.querySelector(".popup__input_type_name");
const jobInput = popupFormEditProfile.querySelector(
  ".popup__input_type_description"
);

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

const popupAvatar = document.querySelector(".popup_type_avatar");
const buttonCloseAvatarForm = popupAvatar.querySelector(".popup__close");
const pathAvatar = popupAvatar.querySelector(".popup__input_type_avatar");

const formAddCard = popupAddCard.querySelector(".popup__form");
const placeInput = formAddCard.querySelector(".popup__input_type_card-name");
const urlInput = formAddCard.querySelector(".popup__input_type_url");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

let userId;
let cardInfoToDelete;
let cardElementToDelete;

function changeButtonText(popup, text) {
  popup.querySelector(".popup__button").textContent = text;
}

enableValidation(validationConfig);

profileImage.addEventListener("click", () => {
  openModal(popupAvatar);
  pathAvatar.value = "";
  clearValidation(popupAddCard, validationConfig);
});

buttonOpenEditProfileForm.addEventListener("click", () => {
  openModal(popupEditProfile);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(popupEditProfile, validationConfig);
});

buttonOpenAddCardForm.addEventListener("click", () => {
  openModal(popupAddCard);
  formAddCard.reset();
  clearValidation(popupAddCard, validationConfig);
});

function createPreview(e) {
  popupImage.alt = e.target.getAttribute("alt");
  popupImage.src = e.target.getAttribute("src");
  popupCaption.textContent = e.target.getAttribute("alt");
  openModal(previewPopup);
}

function openPopupCardDelete(card, cardElement) {
  cardInfoToDelete = card;
  cardElementToDelete = cardElement;
  openModal(popupDelete);
}

function updateAvatar(e) {
  e.preventDefault();
  changeButtonText(popupAvatar, "Сохранение...");
  patchAvatar(pathAvatar.value)
    .then((data) => {
      closeModal(popupAvatar);
      fillProfile(data);
    })
    .catch((error) => {
      console.log("Не удалось загрузить новый аватар. Статус ошибки: " + error);
    })
    .finally(() => {
      changeButtonText(popupAvatar, "Сохранить");
    });
}

function submitEditProfileForm(e) {
  e.preventDefault();
  changeButtonText(popupEditProfile, "Сохранение...");
  const profileInfo = {
    name: nameInput.value,
    about: jobInput.value,
  };
  patchProfile(profileInfo)
    .then((data) => {
      closeModal(popupEditProfile);
      fillProfile(data);
    })
    .catch((error) => {
      console.log(
        "Не удалось внести изменения в данные пользователя. Статус ошибки: " +
          error
      );
    })
    .finally(() => {
      changeButtonText(popupEditProfile, "Сохранить");
    });
}

function handlePopupDeleteSubmit(cardInfoToDelete, cardElementToDelete) {
  changeButtonText(popupDelete, "Удаление...");
  deleteCard(cardInfoToDelete)
    .then(() => {
      closeModal(popupDelete);
      cardElementToDelete.remove();
    })
    .catch((error) => {
      console.log("Не удалось удалить карточку. Статус ошибки: " + error);
    })
    .finally(() => {
      changeButtonText(popupDelete, "Удалить");
    });
}

function likedCard(e, card, cardLikeCounter) {
  if (e.target.classList.contains("card__like-button_is-active")) {
    dislikeCard(card)
      .then((data) => {
        cardLikeCounter.textContent = data.likes.length;
        e.target.classList.remove("card__like-button_is-active");
      })
      .catch((error) => {
        console.log("Не удалось удалить лайк. Статус ошибки: " + error);
      });
  } else {
    likeCard(card)
      .then((data) => {
        cardLikeCounter.textContent = data.likes.length;
        e.target.classList.add("card__like-button_is-active");
      })
      .catch((error) => {
        console.log("Не удалось поставить лайк. Статус ошибки: " + error);
      });
  }
}

function handleCardSubmit(e) {
  e.preventDefault();
  changeButtonText(popupAddCard, "Сохранение...");
  let cards = {
    name: placeInput.value,
    link: urlInput.value,
  };
  postNewCard(cards)
    .then((newCardData) => {
      cardsContainer.append(
        createCard(
          newCardData,
          userId,
          openPopupCardDelete,
          createPreview,
          likedCard
        )
      );
      closeModal(popupAddCard);
    })
    .catch((error) => {
      console.log("Не удалось добавить карточку. Статус ошибки: " + error);
    })
    .finally(() => {
      changeButtonText(popupAddCard, "Сохранить");
    });
}

popupAvatar.addEventListener("submit", updateAvatar);
popupFormEditProfile.addEventListener("submit", submitEditProfileForm);
formAddCard.addEventListener("submit", (e) => handleCardSubmit(e));
buttonCloseAvatarForm.addEventListener("click", () => closeModal(popupAvatar));
buttonCloseEditProfileForm.addEventListener("click", () =>
  closeModal(popupEditProfile)
);
buttonClosePreview.addEventListener("click", () => closeModal(previewPopup));
buttonDelete.addEventListener("click", () =>
  handlePopupDeleteSubmit(cardInfoToDelete, cardElementToDelete)
);
buttonClosePopupDelete.addEventListener("click", () => closeModal(popupDelete));
buttonCloseAddCardForm.addEventListener("click", () =>
  closeModal(popupAddCard)
);

function fillProfile(data) {
  profileTitle.textContent = data.name;
  profileDescription.textContent = data.about;
  profileImage.style.backgroundImage = `url(${data.avatar})`;
}

function fillCard(cards) {
  cards.forEach((newCardData) => {
    cardsContainer.append(
      createCard(
        newCardData,
        userId,
        openPopupCardDelete,
        createPreview,
        likedCard
      )
    );
  });
}

Promise.all([getProfileData(), getCards()])
  .then(([data, cards]) => {
    userId = data._id;
    fillProfile(data);
    fillCard(cards);
  })
  .catch((error) => {
    console.log("Ошибка. Статус ошибки: " + error);
  });
