// ===== MASONRY Gallery ===== //
// DOC: https://packery.metafizzy.co/
import Packery from 'packery';

const msnrEl = document.querySelector('.grid-example');

if (msnrEl) {
  new Packery(msnrEl, {
    itemSelector: '.grid__item',
  });
}
