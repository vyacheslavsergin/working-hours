import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';

export default class Slider {
    constructor(element) {
        this.element = element;

        this.sliderWrapper = this.element.querySelector('[data-dc-slider-ref="slider-element-wrapper"]');
        this.slider = this.element.querySelector('[data-dc-slider-ref="slider-element"]');
        this.timeStart = this.element.querySelector('[data-dc-slider-ref="time-start"]');
        this.timeEnd = this.element.querySelector('[data-dc-slider-ref="time-end"]');
        this.checkbox = this.element.querySelector('[data-dc-slider-ref="checkbox"]');

        this.init();
    }

    init() {
        if (this.checkbox) {
            this.checkbox.addEventListener('change', this.onSliderChangeState);

            if (this.checkbox.checked) {
                this.sliderWrapper.classList.add('is-hidden');
            }
        }

        this.sliderInitial();
    }

    onSliderChangeState = (event) => {
        const isChecked = event.target.checked;

        if (isChecked) {
            this.sliderWrapper.classList.add('is-hidden');
        } else {
            this.sliderWrapper.classList.remove('is-hidden');
        }
    }

    sliderInitial() {
        const sliderElement = noUiSlider.create(this.slider, {
            start: [480, 1020],
            connect: true,
            step: 30,
            range: {
                'min': 0,
                'max': 1440
            }
        });

        sliderElement.on('update', (values, handle) => {
            this.convertValuesToTime(values, handle);
        });
    }

    convertToHour(value) {
        return Math.floor(value / 60);
    }

    convertToMinute(value, hour) {
        return value - hour * 60;
    }

    formatHoursAndMinutes(hours, minutes) {
        if (hours.toString().length === 1) {
            hours = `0${hours}`;
        }

        if (minutes.toString().length === 1) {
            minutes = `0${minutes}`;
        }

        return `${hours}:${minutes}`;
    }

    convertValuesToTime(values, handle) {
        let hours = 0;
        let minutes = 0;

        if (handle === 0){
            hours = this.convertToHour(values[0]);
            minutes = this.convertToMinute(values[0],hours);
            this.timeStart.value = this.formatHoursAndMinutes(hours,minutes);
            return;
        }

        hours = this.convertToHour(values[1]);
        minutes = this.convertToMinute(values[1], hours);

        this.timeEnd.value = this.formatHoursAndMinutes(hours,minutes);
    }
}
