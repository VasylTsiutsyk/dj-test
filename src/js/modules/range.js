// ===== RANGE ===== //
// DOC: https://refreshless.com/nouislider/
import noUiSlider from 'nouislider';

const range = document.querySelector('[data-range-item]');

if (range) {
  noUiSlider.create(range, {
    start: [20, 80],
    connect: true,
    range: {
      min: 0,
      max: 100,
    },
  });
}
