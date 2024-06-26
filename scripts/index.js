const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');

function createCard(cardElement, removeCard) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardTitle = card.querySelector('.card__title')
    cardTitle.textContent = cardElement.name;
    const cardImage = card.querySelector('.card__image')
    cardImage.alt = cardElement.name;
    cardImage.src = cardElement.link;
    const deleteButton = card.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', removeCard);
    return card;
};
function deleteCard(e) {
    e.target.closest('.card').remove()
};
initialCards.forEach(function (arr) {
    cardsContainer.append(createCard(arr, deleteCard))
})