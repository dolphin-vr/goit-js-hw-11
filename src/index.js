import { refs } from './vars';
import { goMore, goSearch } from './handlers';

refs.forma.addEventListener('submit', goSearch);
refs.btnMore.addEventListener('click', goMore);
