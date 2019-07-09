import './scss/index.scss';

import Nav from './js/nav';

const nav = [...document.querySelectorAll('[data-dc-component="nav"]')].map(n => new Nav(n));
