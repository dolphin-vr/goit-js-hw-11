import axios from 'axios';
import { configAx } from './index';

async function serviceGetImages(query, pg=1) {
  configAx.params.q = query;
  configAx.params.page = pg;
  try {
    const { data } = await axios('', configAx);
    // console.log('page = ', pg);
    // console.log('conf = ', configAx);
    // console.log('conf pp = ', configAx.params.page);
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export { serviceGetImages };
