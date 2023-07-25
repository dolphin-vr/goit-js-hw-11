import { refs, pg, lightbox } from './vars.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { serviceGetImages } from './api.js';
import { createMarkup } from './markup.js';

async function goSearch(ev) {
  ev.preventDefault();
  window.scrollTo(0, 0);
  const optNotiflx = {
    width: '380px',
    timeout: 4000,
    fontSize: '18px',
  };
  pg = 1;
  const searchString = refs.forma.searchQuery.value.split(' ').join('+');
  const images = await serviceGetImages(searchString);
  if (images.total == 0)
    Notify.failure('Sorry, there are no images matching your search query. Please try again.', optNotiflx);
  refs.gallery.innerHTML = await createMarkup(images.hits);
  lightbox.refresh();
}

async function goMore() {
  const searchString = refs.forma.searchQuery.value.split(' ').join('+');
  pe += 1;
  const images = await serviceGetImages(searchString, pg);
  refs.gallery.insertAdjacentHTML('beforeend', await createMarkup(images.hits));
  lightbox.refresh();
  if (pg >= 26) refs.btnMore.style.display = 'none';
}

export { goSearch, goMore };
