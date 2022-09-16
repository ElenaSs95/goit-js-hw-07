import { galleryItems } from './gallery-items.js';

const gallery = document.querySelector('.gallery');

gallery.insertAdjacentHTML(
    'afterbegin',
    galleryItems
        .map(
            galleryItem =>
                `<div class="gallery__item">
        <a clss="gallery__link" href="${galleryItem.original}">
        <img class="gallery__image"
        src="${galleryItem.preview}" 
        data-source="${galleryItem.original}"
        alt= "${galleryItem.description}"></a></div>`,
        )
        .join(''),
);

gallery.addEventListener('click', selectedImage);

function selectedImage(e) {
    e.preventDefault();
    if (e.target.nodeName !== 'IMG') {
        return;
    }
    const imgLink = e.target.dataset.source;
    const instance = basicLightbox.create(`<img src="${imgLink}">`, {
        onShow: onModalShow,
        onClose: onModalClose,
    });
    instance.show();

    function onModalShow() {
        window.addEventListener('keydown', onEscKeyPress);
    }

    function onModalClose() {
        window.removeEventListener('keydown', onEscKeyPress);
    }

    function onEscKeyPress(event) {
        const ESC_KEY_CODE = 'Escape';
        const isEscKey = event.code === ESC_KEY_CODE;

        if (isEscKey) {
            instance.close();
        }
    }
}
