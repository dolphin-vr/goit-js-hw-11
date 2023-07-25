import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const API_KEY = '38368366-a7227dffd937457d386778604';

const optsSimplBox = {
  captionsData: 'alt',
  captionDelay: 250,
};
const lightbox = new SimpleLightbox('.gallery a', optsSimplBox);

let pg = 1;

const refs = {
  forma: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  btnMore: document.querySelector('.more'),
};

export { API_KEY, optsSimplBox, lightbox, pg, refs };
