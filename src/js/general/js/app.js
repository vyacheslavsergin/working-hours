// import ComponentsFactory from 'foundation/components-factory';
// import UrlHelper from 'foundation/url-helper';
import MobileDetect from 'mobile-detect';
import detectHover from 'detect-hover';
import eventBus from './event-bus';
// import pageSpinner from './page-spinner';
// import api, { isHtmlContentType } from './api';
// import Modal from './modal';

const globalModalQueryParametr = 'ShowPopup';

export const DEVICE_TYPE_DESKTOP_WIDE = 'desktop-wide';
export const DEVICE_TYPE_DESKTOP = 'desktop';
export const DEVICE_TYPE_TABLET = 'tablet';
export const DEVICE_TYPE_MOBILE_WIDE = 'mobile-wide';
export const DEVICE_TYPE_MOBILE = 'mobile';

export const EVENT_DEVICE_TYPE_CHANGED = 'device-type-changed';
export const EVENT_RESIZE_FINISHED = 'resize:finished';

const VIEWPOR_WIDTH_MOBILE_WIDE = '580px';
const VIEWPOR_WIDTH_TABLET_MIN = '768px';
const VIEWPOR_WIDTH_DESKTOP_MIN = '1024px';
const VIEWPOR_WIDTH_DESKTOP_WIDE_MIN = '1366px';

class App {
    constructor() {
        // this.componentsFactory = ComponentsFactory.getInstance();
        this.resizeDebounceTime = 150;
        this.timeoutId = null;
        this.config = window.appConfig || {};
        this.state = window.appState || {};
        this.isEditMode = document.body.classList.contains('is-editing');

        const md = new MobileDetect(window.navigator.userAgent);

        this.isTouch = (md.mobile() !== null) && !detectHover.anyHover;

        if (this.isTouch) {
            document.documentElement.classList.remove('can-hover');
        }
    }

    init() {
        this.applyViewportData();
        window.addEventListener('resize', this.onWindowResize.bind(this));
        this.componentsFactory.init();
        this.handleModalOpening();
    }

    applyViewportData() {
        this.viewport = {
            width: window.outerWidth,
            height: window.outerHeight,
            orientation: typeof window.orientation === 'undefined' || Math.abs(window.orientation) === 90 ? 'landscape' : 'portrait'
        };

        if (window.matchMedia(`only screen and (min-width:${VIEWPOR_WIDTH_DESKTOP_WIDE_MIN})`).matches) {
            this.deviceTypeByViewport = DEVICE_TYPE_DESKTOP_WIDE;
            this.isDesktopWide = true;
            this.isDesktop = true;
            this.isTablet = true;
            this.isMobileWide = true;
        } else if (window.matchMedia(`only screen and (min-width:${VIEWPOR_WIDTH_DESKTOP_MIN})`).matches) {
            this.deviceTypeByViewport = DEVICE_TYPE_DESKTOP;
            this.isDesktopWide = false;
            this.isDesktop = true;
            this.isTablet = true;
            this.isMobileWide = true;
        } else if (window.matchMedia(`only screen and (min-width:${VIEWPOR_WIDTH_TABLET_MIN})`).matches) {
            this.deviceTypeByViewport = DEVICE_TYPE_TABLET;
            this.isDesktopWide = false;
            this.isDesktop = false;
            this.isTablet = true;
            this.isMobileWide = true;
        } else if (window.matchMedia(`only screen and (min-width:${VIEWPOR_WIDTH_MOBILE_WIDE})`).matches) {
            this.deviceTypeByViewport = DEVICE_TYPE_MOBILE_WIDE;
            this.isDesktopWide = false;
            this.isDesktop = false;
            this.isTablet = false;
            this.isMobileWide = true;
        } else {
            this.deviceTypeByViewport = DEVICE_TYPE_MOBILE;
            this.isDesktopWide = false;
            this.isDesktop = false;
            this.isTablet = false;
            this.isMobileWide = false;
        }
    }

    onWindowResize() {
        if (this.timeoutId !== null) {
            clearTimeout(this.timeoutId);
        }
        this.timeoutId = setTimeout(this.handleWindowResize.bind(this), this.resizeDebounceTime);
    }

    handleWindowResize() {
        const oldDeviceType = this.deviceTypeByViewport;
        this.applyViewportData();
        eventBus.emit(EVENT_RESIZE_FINISHED);
        if (oldDeviceType !== this.deviceTypeByViewport) {
            eventBus.emit(EVENT_DEVICE_TYPE_CHANGED, oldDeviceType, this.deviceTypeByViewport);
        }
    }

    getConfig(property, defaultValue = undefined) {
        return property in this.config ? this.config[property] : defaultValue;
    }

    getRequiredConfig(property) {
        if (!(property in this.config)) {
            throw new Error(`cannot find a property «${property}» in config`);
        }
        return this.config[property];
    }

    handleModalOpening() {
        const params = UrlHelper.getSearchFromLocation(window.location);
        if (globalModalQueryParametr in params) {
            // todo tbd should we remove modal parameter from query
            pageSpinner.show();
            api.get(params[globalModalQueryParametr]).then((response) => {
                if (isHtmlContentType(response)) {
                    (new Modal(response.data, { destroyOnClose: true })).open();
                }
                pageSpinner.hide();
            }, (error) => {
                console.error(error);
                pageSpinner.hide();
            });
        }
    }
}

const instance = new App();
export default instance;
