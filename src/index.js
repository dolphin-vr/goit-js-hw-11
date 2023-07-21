import axios from "axios";

// axios.defaults.baseURL = 'https://pixabay.com/api/'
const API_KEY = '38368366-a7227dffd937457d38677860';
// const BASE_URL = 'https://pixabay.com/api';

const refs = {
   form: document.querySelector('.search-form'),
   gallery: document.querySelector('.gallery'),
}

refs.form.addEventListener('submit', goSearch);

function goSearch(ev){
   ev.preventDefault();
   const serrchString = refs.form.searchQuery.value.split(" ").join("+");
   serviceGetImages(serrchString)
}

async function serviceGetImages(query){
   const config = {
      method: 'get',
      baseURL: 'https://pixabay.com',
      // url: '/api',
      params: {
         key: API_KEY,
         q: query,
         image_type: 'photo',
         orientation: 'horizontal',
         safesearch: true,
      }
   }
   // `https://pixabay.com/api?key=${API_KEY}&q=${q}`;
   console.log(config);
   console.log('===');
   try {
      const {data} = await axios('/api', config);
      // 'https://pixabay.com/api?key=38368366-a7227dffd937457d386778604&q=cat'
      console.log(data);
      return data
   } catch (error) {
      console.log(error.message)
   }
}

function createMarkup(images){
   return images.reduce((acc, img) => {acc + `<div class="photo-card">
   <img src="" alt="" loading="lazy">
   <div class="info">
     <p class="info-item">
       <b>Likes</b>
     </p>
     <p class="info-item">
       <b>Views</b>
     </p>
     <p class="info-item">
       <b>Comments</b>
     </p>
     <p class="info-item">
       <b>Downloads</b>
     </p>
   </div>
 </div>`}, "")
}


   // `https://pixabay.com/api?key=${API_KEY}&q=${q}`;
   // &image_type=photo&orientation=horizontal&safesearch=true

// axios.defaults.headers.common.Authorization = '38368366-a7227dffd937457d386778604';
// axios.defaults.headers.common = 'Access-Control-Allow-Origin' 
// axios.defaults.baseURL = 'https://pixabay.com'