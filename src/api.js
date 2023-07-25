import axios from 'axios';
import { refs, API_KEY } from './vars.js';

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
    if (data.totalHits > 20) refs.btnMore.style.display = 'block';
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export { serviceGetImages };
