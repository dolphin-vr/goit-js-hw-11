import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const API_KEY = '38368366-a7227dffd937457d386778604';
const optsSimplBox = {
  captionsData: 'alt',
  captionDelay: 250,
};
const lightbox = new SimpleLightbox('.gallery a', optsSimplBox);
let page = 1;
const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  btnMore: document.querySelector('.more'),
};
refs.form.addEventListener('submit', goSearch);
refs.btnMore.addEventListener('click', goMore);
async function goSearch(ev) {
  ev.preventDefault();
  const optNotiflx = {
    width: '380px',
    timeout: 4000,
    fontSize: '18px',
  };
  page = 1;
  const searchString = refs.form.searchQuery.value.split(' ').join('+');
  const images = await serviceGetImages(searchString);
  if (images.total == 0)
    Notify.failure('Sorry, there are no images matching your search query. Please try again.', optNotiflx);
  refs.gallery.innerHTML = await createMarkup(images.hits);
  lightbox.refresh();
}
async function goMore() {
  const searchString = refs.form.searchQuery.value.split(' ').join('+');
  const images = await serviceGetImages(searchString, ++page);
  refs.gallery.insertAdjacentHTML('beforeend', await createMarkup(images.hits));
  lightbox.refresh();
  if (page >= 26) refs.btnMore.style.display = 'none';
}
async function serviceGetImages(query, pg = 1) {
  const config = {
    method: 'get',
    baseURL: 'https://pixabay.com',
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: pg,
    },
  };
  try {
    const { data } = await axios('/api', config);
    if (page < data.totalHits) refs.btnMore.style.display = 'block';
    return data;
  } catch (error) {
    console.log(error.message);
  }
}
function createMarkup(images) {
  const res = images
    .map(img => {
      return `<li class="photo-card">
         <a class="card_link" href="${img.largeImageURL}"><img class="card_image" src="${img.webformatURL}" alt="${img.tags}" loading="lazy"></a>
         <div class="info">
         <p class="info-item"><b>Likes: </b>${img.likes}</p>
         <p class="info-item"><b>Views: </b>${img.views}</p>
         <p class="info-item"><b>Comments: </b>${img.comments}</p>
         <p class="info-item"><b>Downloads: </b>${img.downloads}</p>
         </div>
      </li>`;
    })
    .join('');
  return res;
}
