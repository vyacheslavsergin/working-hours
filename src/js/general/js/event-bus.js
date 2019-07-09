import { EventEmitter } from 'fbemitter';

class EventBus extends EventEmitter {
    constructor() {
        super();
        this.listeners = [];
    }

    addListener(eventName, cb) {
        this.listeners.push({
            eventName,
            cb,
            subscription: super.addListener(eventName, cb)
        });
    }

    removeListener(eventName, cb) {
        const foundListener = this.listeners.find((listener) =>
            listener.eventName === eventName &&
            listener.cb === cb);

        if (foundListener) {
            foundListener.subscription.remove();
            foundListener.subscription = null;
        }

        this.listeners = this.listeners.filter((listener) => listener.subscription !== null);
    }
}

export default new EventBus();
