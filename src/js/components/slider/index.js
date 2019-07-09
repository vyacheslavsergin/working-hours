import './scss/index.scss';

import Slider from './js/slider';

const slider = [...document.querySelectorAll('[data-dc-component="slider"]')].map(n => new Slider(n));
