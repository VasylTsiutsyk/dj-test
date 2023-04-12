// ===== SELECT ===== //
// DOC: https://github.com/Choices-js/Choices
import Choices from 'choices.js';

const selectEl = document.querySelector('.select-example');

if (selectEl) {
  new Choices(selectEl, {
    searchEnabled: false,
  });
}
