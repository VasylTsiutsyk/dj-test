// ===== Toggle ===== //
const accordions = document.querySelectorAll('.toggle');

if (accordions.length > 0) {
  accordions.forEach(el => {
    el.addEventListener('click', e => {
      const self = e.currentTarget;
      const control = self.querySelector('.toggle__btn');
      const content = self.querySelector('.toggle__content');
      self.classList.toggle('_active');

      if (self.classList.contains('_active')) {
        control.setAttribute('aria-expanded', true);
        content.setAttribute('aria-hidden', false);
        content.style.maxHeight = `${content.scrollHeight}px`;
      } else {
        control.setAttribute('aria-expanded', false);
        content.setAttribute('aria-hidden', true);
        content.style.maxHeight = null;
      }
    });
  });
}
