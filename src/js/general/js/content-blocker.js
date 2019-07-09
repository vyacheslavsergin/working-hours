const bodyScrollLock = require('body-scroll-lock');
const disableBodyScroll = bodyScrollLock.disableBodyScroll;
const enableBodyScroll = bodyScrollLock.enableBodyScroll;

class ContentBlocker {
    constructor() {
        // this.container = document.documentElement;
    }

    block() {
        disableBodyScroll();
    }

    unblock() {
        enableBodyScroll();
    }


    getScrollbarSize() {
        if (this.scrollbarSize === null) {
            const scrollDiv = document.createElement('div');

            scrollDiv.style.cssText = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;';
            document.body.appendChild(scrollDiv);
            this.scrollbarSize = scrollDiv.offsetWidth - scrollDiv.clientWidth;
            document.body.removeChild(scrollDiv);
        }

        return this.scrollbarSize;
    }
}

const instance = new ContentBlocker();

export default instance;
