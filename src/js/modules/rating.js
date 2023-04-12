// ===== Rating ===== //
// HTML Snippet: s-rating

function initRatings(ratingElements) {
  let ratingActive;
  let ratingValue;

  function initRatingVars(ratingEl) {
    ratingActive = ratingEl.querySelector('.rating__active');
    ratingValue = ratingEl.querySelector('.rating__value');
  }

  function setRatingActiveWidth(index = ratingValue.innerHTML) {
    const ratingActiveWidth = index / 0.05;
    ratingActive.style.width = `${ratingActiveWidth}%`;
  }

  function setRating(rating) {
    const ratingItems = rating.querySelectorAll('.rating__item');

    [...ratingItems].forEach((ratingItem, index) => {
      ratingItem.addEventListener('mouseenter', () => {
        initRatingVars(rating);
        setRatingActiveWidth(ratingItem.value);
      });

      ratingItem.addEventListener('mouseleave', () => {
        setRatingActiveWidth();
      });

      ratingItem.addEventListener('click', () => {
        initRatingVars(rating);

        ratingValue.innerHTML = index + 1;
        setRatingActiveWidth();
      });
    });
  }

  function initRating(rating) {
    initRatingVars(rating);
    setRatingActiveWidth();

    if (rating.classList.contains('rating--set')) {
      setRating(rating);
    }
  }

  [...ratingElements].forEach(ratingEl => {
    initRating(ratingEl);
  });
}

const ratings = document.querySelectorAll('.rating');

if (ratings.length > 0) {
  initRatings(ratings);
}
