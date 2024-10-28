const popupLocation = document.getElementById('locationPopupContainer');
const popupLocationSlide = popupLocation.querySelectorAll('.gallery-item');
const openPopupLocation = document.getElementById('openPopupBtnLocation');
const closePopupLocation = popupLocation.querySelector('.closePopupBtn');
const controlSliderLocation = popupLocation.querySelector('.control-slider');

class LocationSlider {
    constructor(container) {
        this.container = container;
        this.carouselContainer = this.container.querySelector('.gallery-container');
        this.carouselArrayContainer = this.container.querySelectorAll('.gallery-item');
        this.carouselArray = [...this.carouselArrayContainer];
        this.poupLocationArray = [...popupLocationSlide];
        this.legendElement = this.container.querySelector('h2');
        this.textElement = this.container.querySelector('p');

        this.isDragging = false;
        this.startX = 0;
        this.currentX = 0;
        this.openPopup = false;

        this.initDragEvents();
        this.updateGallery();

        openPopupLocation.addEventListener('click', () => this.togglePopup());
        closePopupLocation.addEventListener('click', () => this.togglePopup());
    }

    togglePopup() {
        popupLocation.classList.toggle('close');
        this.openPopup = !this.openPopup;
        this.updateGallery();
        (this.openPopup ? controlSliderLocation.style.backgroud = "rgba(88, 88, 88, 0.6)": "rgba(88, 88, 88, 0.3)");
    }

    updateGallery() {
        this.carouselArray.forEach((el, i) => {
            el.classList.remove('gallery-item-1', 'gallery-item-2', 'gallery-item-3', 'gallery-item-4', 'gallery-item-5');
            this.poupLocationArray[i].classList.remove('gallery-item-1', 'gallery-item-2', 'gallery-item-3');
        });

        this.carouselArray.slice(0, 5).forEach((el, i) => {
            el.classList.add(`gallery-item-${i + 1}`);
            this.poupLocationArray[i].classList.add(`gallery-item-${i + 1}`);   
        });

        this.updateLegend();
    }

    updateLegend() {
        this.legendElement.style.opacity = '0';
        this.textElement.style.opacity = '0';

        setTimeout(() => {
            const activeSlide = this.carouselArray.find(el => el.classList.contains('gallery-item-3'));

            this.legendElement.textContent = activeSlide.getAttribute('data-legend');
            this.textElement.textContent = activeSlide.getAttribute('data-text');

            this.legendElement.style.opacity = '1';
            this.textElement.style.opacity = '1';
        }, 500);
    }

    setCurrentState(direction) {
        if (direction === 'previous') {
            this.carouselArray.unshift(this.carouselArray.pop());
            this.poupLocationArray.unshift(this.poupLocationArray.pop());
        } else if (direction === 'next') {
            this.carouselArray.push(this.carouselArray.shift());
            this.poupLocationArray.push(this.poupLocationArray.shift());
        }

        this.updateGallery();
    }

    initDragEvents() {
        this.carouselContainer.addEventListener('mousedown', (e) => {
            this.isDragging = true;
            this.startX = e.clientX;
        });

        this.carouselContainer.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return;
            this.currentX = e.clientX;
        });

        this.carouselContainer.addEventListener('mouseup', () => {
            if (!this.isDragging) return;
            this.isDragging = false;

            const diff = this.startX - this.currentX;
            if (diff > 50) {
                this.setCurrentState('next');
            } else if (diff < -50) {
                this.setCurrentState('previous');
            }
        });

        this.carouselContainer.addEventListener('touchstart', (e) => {
            this.isDragging = true;
            this.startX = e.touches[0].clientX;
        });

        this.carouselContainer.addEventListener('touchmove', (e) => {
            if (!this.isDragging) return;
            this.currentX = e.touches[0].clientX;
        });

        this.carouselContainer.addEventListener('touchend', () => {
            if (!this.isDragging) return;
            this.isDragging = false;

            const diff = this.startX - this.currentX;
            if (diff > 50) {
                this.setCurrentState('next');
            } else if (diff < -50) {
                this.setCurrentState('previous');
            }
        });
    }
}

const locationSlider = new LocationSlider(document.getElementById('location-6'));