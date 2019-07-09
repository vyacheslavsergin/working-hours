import contentBlocker from '../../../general/js/content-blocker';
// const size = require('window-size');
import app, { EVENT_DEVICE_TYPE_CHANGED } from '../../../general/js/app';
import eventBus from '../../../general/js/event-bus';

import { throttle, debounce } from 'underscore';

export default class Dashboard {
    constructor(element) {
        this.element = element;

        this.menuButton = this.element.querySelector('[data-dc-dashboard-ref="menu-button"]');

        this.nav = document.querySelector('[data-dc-component="nav"]');
        this.backdrop = document.querySelector('[data-dc-nav-ref="backdrop"]');
        this.drawer = document.querySelector('[data-dc-nav-ref="drawer"]');

        this.init();
    }

    init() {
        this.menuButton.addEventListener('click', this.onShowNav)

        // console.log('size', size);

        eventBus.addListener(EVENT_DEVICE_TYPE_CHANGED, this.changedRenderedViews);

        // console.log('deviceTypeByViewport', app.deviceTypeByViewport);

        // https://developer.mozilla.org/ru/docs/Web/API/Window/resize_event
        const throttle = (type, name, obj) => {
            obj = obj || window;
            let running = false;
            const func = () => {
                if (running) {
                    return;
                }

                running = true;

                requestAnimationFrame(() => {
                    obj.dispatchEvent(new CustomEvent(name));
                    running = false;
                });
            };

            obj.addEventListener(type, func);
        };

        /* init - you can init any event */
        throttle("resize", "optimizedResize");

        // handle event
        window.addEventListener('optimizedResize', this.setBack);

        // https://learn.javascript.ru/metrics-window
    }

    setBack = debounce(() => {
        console.log("Resource conscious resize callback!");
    }, 1000)

    changedRenderedViews = () => {
        // console.log('deviceTypeByViewport', app.deviceTypeByViewport);
    }

    onShowNav = () => {
        contentBlocker.block();

        this.nav.classList.add('is-visible');
        this.backdrop.classList.add('is-visible');
        this.drawer.classList.add('is-visible');
    }
}
