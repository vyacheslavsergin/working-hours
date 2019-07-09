import './scss/index.scss';

import Dashboard from './js/dashboard';

const dashboard = [...document.querySelectorAll('[data-dc-component="dashboard"]')].map(n => new Dashboard(n));
