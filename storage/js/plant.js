const popupPlan = document.getElementById('planPopupContainer');
const popupPlanSlide = popupPlan.querySelectorAll('.gallery-item');
const openPopupPlan = document.getElementById('openPopupBtnPlan');
const closePopupPlan = popupPlan.querySelector('.closePopupBtn');

class CarouselPlant {
    constructor(container, controlButtons) {
        this.container = container;
        this.carouselContainer = this.container.querySelector('.gallery-container');
        this.carouselArrayContainer = this.container.querySelectorAll('.gallery-item');
        this.carouselArray = [...this.carouselArrayContainer];
        this.poupPlan = [...popupPlanSlide];

        this.controlButtons = controlButtons;
        
        this.isDragging = false;
        this.startX = 0;
        this.currentX = 0;

        this.initDragEvents();
        this.initButtonControls();
        this.updateGallery();

        openPopupPlan.addEventListener('click', () => this.togglePopup());
        closePopupPlan.addEventListener('click', () => this.togglePopup());
    }

    togglePopup() {
        popupPlan.classList.toggle('close');
        this.openPopup = !this.openPopup;
        this.updateGallery();
    }

    updateGallery() {
        this.carouselArray.forEach((el, i) => {
            el.classList.remove('gallery-item-1', 'gallery-item-2', 'gallery-item-3');
            this.poupPlan[i].classList.remove('gallery-item-1', 'gallery-item-2', 'gallery-item-3');
        });

        this.carouselArray.slice(0, 3).forEach((el, i) => {
            el.classList.add(`gallery-item-${i + 1}`);
            this.poupPlan[i].classList.add(`gallery-item-${i + 1}`);
        });

        this.updateActiveButton();
    }

    updateActiveButton() {
        const activeSlideIndex = parseInt(this.carouselArray[1].getAttribute('data-index'), 10);

        this.controlButtons.forEach((button) => {
            const buttonIndex = parseInt(button.getAttribute('data-index'), 10);
            const isActive = buttonIndex === activeSlideIndex;
            button.classList.toggle('active', isActive);
        });
    }

    setCurrentState(index) {
        while (parseInt(this.carouselArray[1].getAttribute('data-index'), 10) !== index + 1) {
            this.carouselArray.push(this.carouselArray.shift());
            this.poupPlan.push(this.poupPlan.shift());
        }
        this.updateGallery();
    }

    initButtonControls() {
        this.controlButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                this.setCurrentState(index);
            });
        });
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
                this.carouselArray.push(this.carouselArray.shift());
                this.updateGallery();
            } else if (diff < -50) {
                this.carouselArray.unshift(this.carouselArray.pop());
                this.updateGallery();
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
                this.carouselArray.push(this.carouselArray.shift());
                this.updateGallery();
            } else if (diff < -50) {
                this.carouselArray.unshift(this.carouselArray.pop());
                this.updateGallery();
            }
        });
    }
}

const controlButtons = document.querySelectorAll('#plan-5 .control-slider button');
const planSlider = new CarouselPlant(document.querySelector('#plan-5 .main-content'), controlButtons);