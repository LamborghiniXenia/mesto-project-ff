function openModal(popupModal) {//открывает модальное окно и вешает слушатели на кнопку Esc и щелчок по оверлею
    document.addEventListener('keydown', closeModalKey)
    popupModal.addEventListener('click', closeModalOverlay);
    popupModal.classList.add('popup_is-opened');
};

function closeModal(popupModal) {//удаляет слушатели и закрывает модалку
    document.removeEventListener('keydown', closeModalKey)
    popupModal.removeEventListener('click', closeModalOverlay);
    popupModal.classList.remove('popup_is-opened');
};

function closeModalKey (e) {//закрывает модалку по щелчку Esc
    if(e.key === 'Escape') {
        closeModal(document.querySelector('.popup_is-opened'));
    }
};

function closeModalOverlay (e) {//закрывает модалку по щелчку на оверлей
    if(e.currentTarget === e.target) {
        closeModal(document.querySelector('.popup_is-opened'));
    }
};

export {openModal, closeModal};
