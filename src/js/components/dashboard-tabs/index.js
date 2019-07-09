import './scss/index.scss';

import DashboardTabs from './js/dashboard-tabs';

const dashboardTabs = [...document.querySelectorAll('[data-dc-component="dashboard-tabs"]')].map(n => new DashboardTabs(n));
