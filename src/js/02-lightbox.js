import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);


// Создание и рендер разметки по массиву данных galleryItems и предоставленному шаблону элемента галереи.

const imagesGallery = document.querySelector('.gallery');

function createImagesGalleryMarkup(galleryItems) {
    return galleryItems.map(({ preview, original, description }) => {
        return `
        <a class="gallery__item" href="${original}">
            <img 
                class="gallery__image" 
                src="${preview}" 
                alt="${description}" 
            />
        </a>`
    }).join('');
};

const galleryMarkup = createImagesGalleryMarkup(galleryItems);

imagesGallery.insertAdjacentHTML('beforeend', galleryMarkup);
