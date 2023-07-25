import { refs } from './vars.js';
import { goMore, goSearch } from './handlers.js';

refs.forma.addEventListener('submit', goSearch);
refs.btnMore.addEventListener('click', goMore);
