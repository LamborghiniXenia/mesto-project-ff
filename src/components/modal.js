function openModal(popupModal) {
    popupModal.classList.add('popup_is-opened');
    document.addEventListener('keydown', function(e) {
        if(e.key === 'Escape') {
        closeModal(popupModal);
    }});
    popupModal.addEventListener('click', function(e) {
        if(e.currentTarget === e.target) {
        closeModal(popupModal);
    }});
};

function closeModal(popupModal) {
    popupModal.classList.remove('popup_is-opened');
};

export {openModal, closeModal};
