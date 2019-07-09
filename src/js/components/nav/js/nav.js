import contentBlocker from '../../../general/js/content-blocker';

export default class Nav {
    constructor(element) {
        this.element = element;

        this.backdrop = this.element.querySelector('[data-dc-nav-ref="backdrop"]');
        this.drawer = this.element.querySelector('[data-dc-nav-ref="drawer"]');

        this.init();
    }

    init() {
        this.backdrop.addEventListener('click', this.onHideNav);
    }

    onHideNav = () => {
        contentBlocker.unblock();

        window.setTimeout(() => {
            this.element.classList.remove('is-visible');
        }, 300);
        this.backdrop.classList.remove('is-visible');
        this.drawer.classList.remove('is-visible');
    }
}
