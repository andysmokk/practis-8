import { galleryItems } from './gallery';

const refs = {
  gallery: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.js-lightbox'),
  lightboxImg: document.querySelector('.lightbox__image'),
};

let activeImg = null;

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

  createGallery(galleryItems).forEach((el, idx) => {
    if (el.includes(e.target.src)) {
      activeImg = idx;
    }
  });

  window.addEventListener('keydown', closeModalEsc);
  window.addEventListener('keydown', changeImgArrow);
}

refs.lightbox.addEventListener('click', onCloseModalClick);
function onCloseModalClick(e) {
  if (e.target.nodeName === 'IMG') {
    return;
  }

  refs.lightbox.classList.remove('is-open');
  refs.lightboxImg.src = '';

  window.removeEventListener('keydown', closeModalEsc);
  window.removeEventListener('keydown', changeImgArrow);
}

function closeModalEsc(e) {
  if (e.code !== 'Escape') {
    return;
  }
  onCloseModalClick(e);
}

function changeImgArrow(e) {
  if (e.code === 'ArrowRight' && activeImg < galleryItems.length - 1) {
    refs.lightboxImg.src = galleryItems[(activeImg += 1)].original;
    return;
  }
  if (e.code === 'ArrowLeft' && activeImg > 0) {
    refs.lightboxImg.src = galleryItems[(activeImg -= 1)].original;
    return;
  }
  if (e.code === 'ArrowRight' && activeImg === galleryItems.length - 1) {
    activeImg = 0;
    refs.lightboxImg.src = galleryItems[activeImg].original;
    return;
  }
  if (e.code === 'ArrowLeft' && activeImg === 0) {
    activeImg = galleryItems.length - 1;
    refs.lightboxImg.src = galleryItems[activeImg].original;
    return;
  }
}

// function keyboardManipulation({ key }) {
//   switch (key) {
//     case gallery.length - 1 > activeIndex && 'ArrowRight':
//       activeIndex += 1;
//       refs.modalImg.src = gallery[activeIndex].original;
//       break;
//     case activeIndex > 0 && 'ArrowLeft':
//       activeIndex -= 1;
//       refs.modalImg.src = gallery[activeIndex].original;
//       break;
//     case activeIndex === gallery.length - 1 && 'ArrowRight':
//       activeIndex = 0;
//       refs.modalImg.src = gallery[activeIndex].original;
//       break;
//     case activeIndex === 0 && 'ArrowLeft':
//       activeIndex = gallery.length - 1;
//       refs.modalImg.src = gallery[activeIndex].original;
//       break;
//     case 'Escape':
//       closeModal();
//       break;
//     default:
//       alert('что-то пошло не так');
//   }
// }
