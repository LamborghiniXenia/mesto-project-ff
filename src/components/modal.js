function openModal(popupModal) {
    document.addEventListener('keydown', closeModalKey)
    popupModal.addEventListener('click', closeModalOverlay);
    popupModal.classList.add('popup_is-opened');
};

function closeModal(popupModal) {
    document.removeEventListener('keydown', closeModalKey)
    popupModal.removeEventListener('click', closeModalOverlay);
    popupModal.classList.remove('popup_is-opened');
};

function closeModalKey (e) {
    if(e.key === 'Escape') {
        closeModal(document.querySelector('.popup_is-opened'));
    }
};

function closeModalOverlay (e) {
    if(e.currentTarget === e.target) {
        closeModal(document.querySelector('.popup_is-opened'));
    }
};

export {openModal, closeModal};
