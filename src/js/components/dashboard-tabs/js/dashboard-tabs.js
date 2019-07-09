export default class DashboardTabs {
    constructor(element) {
        this.element = element;

        this.tabsNav = [...this.element.querySelectorAll('[data-dc-dashboard-tabs-ref="tab-nav[]"]')];
        this.tabsContent = [...this.element.querySelectorAll('[data-dc-dashboard-tabs-ref="tab-content[]"]')];
        this.nav = [...this.element.querySelectorAll('[data-dc-dashboard-tabs-ref="nav"]')];

        this.init();
    }

    init() {
        this.tabsNav.forEach((tab) => {
            tab.addEventListener('click', this.onSelectTabNav);
        });

        this.slidingLineHandler();
    }

    slidingLineHandler = () => {
        // this.nav.appendChild('div');
    }

    onSelectTabNav = (event) => {
        this.tabsNav.forEach((item) => {
            item.classList.remove('is-active');
        });

        event.currentTarget.classList.add('is-active');

        const index = event.currentTarget.getAttribute('data-dc-dashboard-tabs-options');

        this.onSelectTabContent(index);
    }

    onSelectTabContent = (index) => {
        this.tabsContent.forEach((item) => {
            item.classList.remove('is-active');
        });

        const currentContent = this.tabsContent.filter((item) => {
            return item.getAttribute('data-dc-dashboard-tabs-options') === index;
        })[0];

        currentContent.classList.add('is-active');
    }
}
