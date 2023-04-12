// ===== Map ===== //
// DOC: https://github.com/davidkudera/google-maps-loader
import { Loader } from 'google-maps';

const mapEl = document.getElementById('map');

if (mapEl) {
  const API_KEY = 'AIzaSyDW1aya8mEpmEct--aGO4u05RGkVfszaic'; // need to set, from google maps

  const options = {};
  const loader = new Loader(API_KEY, options);

  loader.load().then(google => {
    new google.maps.Map(mapEl, {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });
  });
}
