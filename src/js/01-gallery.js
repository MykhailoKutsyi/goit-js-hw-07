import { galleryItems } from './gallery-items.js';
// Change code below this line

// Создание и рендер разметки по массиву данных galleryItems и предоставленному шаблону элемента галереи.

const imagesGallery = document.querySelector('.gallery');

function createImagesGalleryMarkup(galleryItems) {
    return galleryItems.map(({ preview, original, description }) => {
        return `
        <div class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                />
            </a>
        </div>`
    }).join('');
};

const galleryMarkup = createImagesGalleryMarkup(galleryItems);

imagesGallery.insertAdjacentHTML('beforeend', galleryMarkup);

// Реализация делегирования на div.gallery и получение url большого изображения.

imagesGallery.addEventListener('click', onDivImagesContainerClick);

function onDivImagesContainerClick(evt) {
    if (evt.target.nodeName !== 'IMG') {
        return;
    }
    evt.preventDefault();
    const setImgOriginalUrl = evt.target.dataset.source;
    const setImgAlt = evt.target.alt;
    createModalWindowWithImage(setImgOriginalUrl, setImgAlt);
}

// Открытие модального окна по клику на элементе галереи.
let instance;
function createModalWindowWithImage(setImgOriginalUrl, setImgAlt) {
    instance = basicLightbox.create(`
        <div class="modal">
            <img
                class="gallery__image"
                src="${setImgOriginalUrl}"
                alt="${setImgAlt}"
            />
        </div>`,

        {
            onShow: evt => {
                addEvtListener();
            },
            onClose: evt => {
                removeEvtListener();
            },
        },
    );
  instance.show();
}

function addEvtListener() {
    document.addEventListener('keydown', onEscPress);
    document.addEventListener('click', onMouseClick);
}
function removeEvtListener() {
    document.removeEventListener('keydown', onEscPress);
    document.removeEventListener('click', onMouseClick);
    
}

// Закрытие модального окна по нажатию клавиши Escape. 
function onEscPress() {
    if (event.code === 'Escape') {
        instance.close();
    }
}

// Закрытие модального окна по клику мышки. 
function onMouseClick() {
    document.querySelector('.modal').addEventListener('click', instance.close);
}
