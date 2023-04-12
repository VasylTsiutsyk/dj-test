// ===== SLIDER ===== //
// DOC: https://swiperjs.com/

import Swiper, { Navigation, Pagination } from 'swiper';

// If need Autoplay or other modules => add to Swiper.use([...])
Swiper.use([Navigation, Pagination]);

const slider = new Swiper('.swiper-example', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});
