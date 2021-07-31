import { galleryItems } from './gallery';

const refs = {
  gallery: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.js-lightbox'),
  lightboxImg: document.querySelector('.lightbox__image'),
};

createGallery(galleryItems);

function createGallery(images) {
  return images.map(({ preview, original, description }) => {
    return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
  });
}

refs.gallery.insertAdjacentHTML('beforeend', createGallery(galleryItems).join(''));
refs.gallery.addEventListener('click', onOpenModalClick);
function onOpenModalClick(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'IMG') {
    return;
  }

  refs.lightbox.classList.add('is-open');
  refs.lightboxImg.src = e.target.dataset.source;
}

refs.lightbox.addEventListener('click', onCloseModalClick);
function onCloseModalClick(e) {
  if (e.target.nodeName === 'IMG') {
    return;
  }

  refs.lightbox.classList.remove('is-open');
  refs.lightboxImg.src = '';
}
