const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');
const card = cardTemplate.querySelector('.card');
function createCard(cardElement, removeCard) {
    const placesItem = card.cloneNode(true);
    const cardTitle = placesItem.querySelector('.card__title')
    cardTitle.textContent = cardElement.name;
    const cardImage = placesItem.querySelector('img')
    cardImage.alt = cardElement.name;
    cardImage.src = cardElement.link;
    const deleteButton = placesItem.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', removeCard);
    return placesItem;
};
function DeleteCard(e) {
    e.target.closest('.card').remove()
};
initialCards.forEach(function (arr) {
    placesList.append(createCard(arr, DeleteCard))
})