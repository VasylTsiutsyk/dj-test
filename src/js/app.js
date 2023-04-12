/* eslint-disable import/extensions */
/* eslint-disable node/no-unsupported-features/es-syntax */

import {
  isWebp,
  isMobile,
  initMenu,
  initCopyright,
} from './modules/functions.js';

// TABS
// HTML Snippet: tabs
// import Tabs from './modules/tabs.js';
// new Tabs('tab');

// TOGGLES
// HTML Snippet: toggle
// initToggles();

// MODALS
// HTML Snippet: modal
// import Modal from './modules/modal.js';
// new Modal();

// DYNAMIC ADAPT
// import DynamicAdapt from './modules/dynamic-adapt.js';
// new DynamicAdapt().init();

// QUANTITY INPUT
// HTML Snippet: input-quantity
// initInputQuantity();

// TIME COUNT
// HTML Snippet: time-count
// initTimeCount();

// -----------------LIBS-------------------//
// SLIDERS
// https://swiperjs.com/
// import './modules/sliders.js';

// SELECTS
// https://github.com/Choices-js/Choices
// import './modules/selects.js';

// GALLERIES
// https://packery.metafizzy.co/
// import './modules/gallery.js';

// ANIMATIONS
// https://michalsnik.github.io/aos/
// import './modules/animations.js';

// GOOGLE MAPS
// https://github.com/davidkudera/google-maps-loader
// import './modules/map.js';

// RANGE INPUT
// https://refreshless.com/nouislider/
// import './modules/range.js';

import 'bootstrap';

// import './modules/spoilers.js';
// import './modules/toggle.js';
// import './modules/rating.js';

// IS WEBP TEST
isWebp();

// IS MOBILE TEST
isMobile();

// HEADER MOBILE MENU
initMenu();

// HEADER SCROLLED STATE
// initScrollHeader();

// Copyright
initCopyright();

// global variables
let currentPage = 1;
const perPage = 10;
let isFetching = false;

function renderProducts(products) {
  const productList = document.getElementById('product-list');

  products.forEach(product => {
    // Col
    const productCard = document.createElement('div');
    productCard.classList.add('col-md-6', 'mb-4');

    // Card
    const card = document.createElement('div');
    card.classList.add('card', 'h-100');

    // Card Img

    const cardImgWrap = document.createElement('div');
    cardImgWrap.classList.add('card-img-wrap');

    const cardImg = document.createElement('img');
    cardImg.classList.add('card-img-top');
    cardImg.src = product.download_url;

    cardImgWrap.appendChild(cardImg);

    // Card Title
    const cardTitle = document.createElement('h3');
    cardTitle.classList.add('card-title');
    cardTitle.classList.add('fs-4');
    cardTitle.classList.add('mb-1');
    cardTitle.textContent = product.author;

    // Card Body
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    // Card Text
    const cardText = document.createElement('p');
    cardText.classList.add('card-text');
    cardText.textContent =
      product.description ||
      'Here goes some sample, example text that is relatively short. Here goes some sample, example text that is relatively short. Here goes some sample, example text that is relatively short. Here goes some sample, example text that is relatively short.';

    // Card Footer
    const cardFooter = document.createElement('div');
    cardFooter.classList.add('card-footer');
    cardFooter.classList.add('d-flex');
    cardFooter.classList.add('flex-wrap');
    cardFooter.classList.add('gap-3');

    // Card Add to Collection Btn
    const addToCollectionBtn = document.createElement('button');
    addToCollectionBtn.classList.add('btn');
    addToCollectionBtn.classList.add('btn-primary');
    addToCollectionBtn.textContent = 'Add to Collection';

    // Card Share Btn
    const shareBtn = document.createElement('button');
    shareBtn.classList.add('btn');
    shareBtn.classList.add('btn-outline-secondary');
    shareBtn.textContent = 'Share';

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardFooter.appendChild(addToCollectionBtn);
    cardFooter.appendChild(shareBtn);
    card.appendChild(cardImgWrap);
    card.appendChild(cardBody);
    card.appendChild(cardFooter);
    productCard.appendChild(card);
    productList.appendChild(productCard);

    if (cardBody.scrollHeight > 100) {
      const showMoreBtn = document.createElement('button');
      showMoreBtn.classList.add('btn-link');

      showMoreBtn.textContent = 'Show more...';
      cardBody.appendChild(showMoreBtn);

      showMoreBtn.style.display = 'block';

      cardText.style.maxHeight =
        'calc(var(--font-size) * var(--rows) * var(--line-height))';
      cardText.style.overflow = 'hidden';

      showMoreBtn.addEventListener('click', () => {
        if (
          cardText.style.maxHeight ===
          'calc(var(--font-size) * var(--rows) * var(--line-height))'
        ) {
          cardText.style.maxHeight = '200px';
          showMoreBtn.textContent = 'Show less';
        } else {
          cardText.style.maxHeight =
            'calc(var(--font-size) * var(--rows) * var(--line-height))';
          showMoreBtn.textContent = 'Show more';
        }
      });
    }
  });
}

// eslint-disable-next-line no-shadow
function fetchProducts(page, perPage) {
  isFetching = true;

  fetch(`https://picsum.photos/v2/list?page=${page}&limit=${perPage}`)
    .then(response => response.json())
    .then(data => {
      renderProducts(data);
      isFetching = false;
    })
    .catch(error => {
      console.error(error);
      isFetching = false;
    });
}

fetchProducts(currentPage);

window.addEventListener('scroll', () => {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 10 && !isFetching) {
    currentPage++;
    fetchProducts(currentPage, perPage);
  }
});
