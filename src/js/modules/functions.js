/* eslint-disable import/extensions */
/* eslint-disable node/no-unsupported-features/es-syntax */

import { BODY, USER_AGENT } from './constants.js';

function isWebp() {
  function testWebP(callback) {
    const webP = new Image();
    webP.onload = webP.onerror = function () {
      callback(webP.height === 2);
    };
    webP.src =
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  }

  testWebP(support => {
    if (support) {
      BODY.classList.add('webp');
    } else {
      BODY.classList.add('no-webp');
    }
  });
}

function isMobile() {
  const isMobile = {
    Android: () => USER_AGENT.match(/Android/i),
    BlackBerry: () => USER_AGENT.match(/BlackBerry/i),
    iOS: () => USER_AGENT.match(/iPhone|iPad|iPod/i),
    Opera: () => USER_AGENT.match(/Opera Mini/i),
    Windows: () =>
      USER_AGENT.match(/IEMobile/i) || USER_AGENT.match(/WPDesktop/i),
    any: () =>
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows(),
  };

  if (isMobile.any()) {
    BODY.classList.remove('pc');
    BODY.classList.add('touch');
  } else {
    BODY.classList.remove('touch');
    BODY.classList.add('pc');
  }

  return !!isMobile.any();
}

function disableScroll() {
  const paddingOffset = `${window.innerWidth - BODY.offsetWidth}px`;
  const pagePosition = window.scrollY;

  BODY.style.paddingRight = paddingOffset;
  BODY.classList.add('disable-scroll');
  BODY.dataset.position = pagePosition;
  BODY.style.top = `${-pagePosition}px`;
}

function enableScroll() {
  const pagePosition = parseInt(BODY.dataset.position, 10);
  BODY.style.top = 'auto';
  BODY.classList.remove('disable-scroll');
  BODY.style.paddingRight = '0px';
  window.scroll({ top: pagePosition, left: 0 });
  BODY.removeAttribute('data-position');
}

function initMenu() {
  const menuBtn = document.querySelector('[data-burger]');
  const menuBody = document.querySelector('[data-menu]');

  if (menuBtn && menuBody) {
    menuBtn.addEventListener('click', e => {
      if (!e.target.classList.contains('active')) {
        menuBtn.classList.add('active');
        menuBody.classList.add('active');
        disableScroll();
      } else {
        menuBtn.classList.remove('active');
        menuBody.classList.remove('active');
        enableScroll();
      }
    });

    if (isMobile()) {
      initMenuArrows();
    }
  }

  function initMenuArrows() {
    const menuArrows = menuBody.querySelectorAll('.menu__arrow');

    if (menuArrows.length > 0) {
      [...menuArrows].forEach(arrow => {
        arrow.addEventListener('click', () => {
          arrow.parentElement.classList.toggle('active');
        });
      });
    }
  }
}

function initScrollHeader() {
  const header = document.querySelector('.header');
  const headerHeight = header.offsetHeight;

  window.addEventListener('scroll', () => {
    const scrollDistance = window.scrollY;

    if (scrollDistance >= headerHeight) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  });
}

function animateValue(obj, end, duration = 1000) {
  const start = end - duration / 30;
  let startTimestamp = null;

  const step = timestamp => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.firstChild.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };

  window.requestAnimationFrame(step);
}

function initInputQuantity() {
  const steppers = document.querySelectorAll('.input-quantity');

  if (steppers.length > 0) {
    steppers.forEach(stepper => {
      const stepperInput = stepper.querySelector('.input-quantity__input');
      const stepperBtnUp = stepper.querySelector('.input-quantity__btn--up');
      const stepperBtnDown = stepper.querySelector(
        '.input-quantity__btn--down'
      );

      let count = stepperInput.value;

      function allowNumbersOnly(e) {
        const code = e.which ? e.which : e.keyCode;
        if (code > 31 && (code < 48 || code > 57)) {
          e.preventDefault();
        }
      }

      stepperInput.addEventListener('keyup', e => {
        const self = e.currentTarget;

        if (self.value == '0') self.value = 1;

        count = stepperInput.value;
        stepperBtnDown.disabled = !count == 1;
      });

      stepperInput.addEventListener('keypress', e => {
        allowNumbersOnly(e);
      });

      stepperInput.addEventListener('change', e => {
        const self = e.currentTarget;

        if (!self.value) self.value = 1;

        count = stepperInput.value;
        stepperBtnDown.disabled = !count == 1;
      });

      stepperBtnUp.addEventListener('click', e => {
        e.preventDefault();
        count++;
        stepperBtnDown.disabled = !count == 1;
        stepperInput.value = count;
      });

      stepperBtnDown.addEventListener('click', e => {
        e.preventDefault();
        count--;
        stepperBtnDown.disabled = !count == 1;
        stepperInput.value = count;
      });
    });
  }
}

function initTimeCount() {
  const finishDate = new Date('Jan 1 2023 00:00:00');

  const timeCountTemplate = document.querySelector('.time-count');

  if (timeCountTemplate) {
    const daysVal = timeCountTemplate.querySelector(
      '.time-count__item--days .time-count__val'
    );
    const hoursVal = timeCountTemplate.querySelector(
      '.time-count__item--hours .time-count__val'
    );
    const minVal = timeCountTemplate.querySelector(
      '.time-count__item--minutes .time-count__val'
    );
    const secVal = timeCountTemplate.querySelector(
      '.time-count__item--seconds .time-count__val'
    );

    const daysText = timeCountTemplate.querySelector(
      '.time-count__item--days .time-count__text'
    );
    const hoursText = timeCountTemplate.querySelector(
      '.time-count__item--hours .time-count__text'
    );
    const minText = timeCountTemplate.querySelector(
      '.time-count__item--minutes .time-count__text'
    );
    const secText = timeCountTemplate.querySelector(
      '.time-count__item--seconds .time-count__text'
    );

    function declOfNum(number, titles) {
      const cases = [2, 0, 1, 1, 1, 2];

      return titles[
        number % 100 > 4 && number % 100 < 20
          ? 2
          : cases[number % 10 < 5 ? number % 10 : 5]
      ];
    }

    const timeCount = () => {
      const now = new Date();
      const leftUntil = finishDate - now;

      const days = Math.floor(leftUntil / 1000 / 60 / 60 / 24);
      const hours = Math.floor(leftUntil / 1000 / 60 / 60) % 24;
      const minutes = Math.floor(leftUntil / 1000 / 60) % 60;
      const seconds = Math.floor(leftUntil / 1000) % 60;

      daysVal.textContent = days;
      hoursVal.textContent = hours;
      minVal.textContent = minutes;
      secVal.textContent = seconds;

      daysText.textContent = declOfNum(days, ['day', 'days', 'days']);
      hoursText.textContent = declOfNum(hours, ['hour', 'hours', 'hours']);
      minText.textContent = declOfNum(minutes, ['min', 'min', 'min']);
      secText.textContent = declOfNum(seconds, ['sec', 'sec', 'sec']);
    };

    timeCount();
    setInterval(timeCount, 1000);
  }
}

function initCopyright() {
  const copyrightEl = document.querySelector('#copyrightYear');

  if (copyrightEl) {
    const year = new Date().getFullYear();
    copyrightEl.innerText = year;
  }
}

export {
  isWebp,
  isMobile,
  animateValue,
  initScrollHeader,
  initMenu,
  initInputQuantity,
  initTimeCount,
  initCopyright,
};
