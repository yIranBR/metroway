const popupPerspectives = document.getElementById('perspectivePopupContainer');
const popupPerspectivesSlide = popupPerspectives.querySelectorAll('.gallery-item');
const openPopupPerspective = document.getElementById('openPopupBtnPerspective');
const closePopupPerspective = popupPerspectives.querySelector('.closePopupBtn');

class Carousel {
    constructor(container) {
        this.container = container;
        this.carouselContainer = this.container.querySelector('.gallery-container');
        this.carouselArrayContainer = this.container.querySelectorAll('.gallery-item');
        this.carouselArray = [...this.carouselArrayContainer];
        this.popupArray = [...popupPerspectivesSlide];
        this.backSlide = this.container.querySelector('.backSlide');
        this.nextSlide = this.container.querySelector('.nextSlide');
        this.legend = this.container.querySelector('p');
        
        this.isDragging = false;
        this.startX = 0;
        this.currentX = 0;
        this.openPopup = false;

        this.initDragEvents();

        openPopupPerspective.addEventListener('click', () => this.togglePopup());
        closePopupPerspective.addEventListener('click', () => this.togglePopup());
    }

    togglePopup() {
        popupPerspectives.classList.toggle('close');
        this.openPopup = !this.openPopup;
        this.updateGallery();
    }

    updateGallery() {
        this.carouselArray.forEach((el, i) => {
            el.classList.remove('gallery-item-1', 'gallery-item-2', 'gallery-item-3', 'gallery-item-4', 'gallery-item-5');
            this.popupArray[i].classList.remove('gallery-item-1', 'gallery-item-2', 'gallery-item-3', 'gallery-item-4', 'gallery-item-5');
        });

        this.carouselArray.slice(0, 5).forEach((el, i) => {
            el.classList.add(`gallery-item-${i + 1}`);

            if (this.openPopup) {
                this.popupArray[i].classList.add(`gallery-item-${i + 1}`);
            }
        });

        this.updateLegend();
    }

    updateLegend() {
        this.legend.style.opacity = '0';
        
        setTimeout(() => {
            const activeSlide = this.carouselArray.find(el => el.classList.contains('gallery-item-3'));
            this.legend.textContent = activeSlide.getAttribute('data-legend');
            
            this.legend.style.opacity = '1';
        }, 500);
    }

    setCurrentState(direction) {
        if (direction === 'previous') {
            this.carouselArray.unshift(this.carouselArray.pop());
            this.popupArray.unshift(this.popupArray.pop());
        } else if (direction === 'next') {
            this.carouselArray.push(this.carouselArray.shift());
            this.popupArray.push(this.popupArray.shift());
        }

        this.updateGallery();
    }

    useControls() {
        this.backSlide.addEventListener('click', (e) => {
            e.preventDefault();
            this.setCurrentState('previous');
        });

        this.nextSlide.addEventListener('click', (e) => {
            e.preventDefault();
            this.setCurrentState('next');
        });
    }

    initDragEvents() {
        this.carouselContainer.addEventListener('mousedown', (e) => {
            if (this.openPopup == false) {
                this.isDragging = true;
                this.startX = e.clientX;
            }
        });

        this.carouselContainer.addEventListener('mousemove', (e) => {
            if (this.openPopup == false) {
                if (!this.isDragging) return;
                this.currentX = e.clientX;
            }
        });

        this.carouselContainer.addEventListener('mouseup', () => {
            if (this.openPopup == false) {
                if (!this.isDragging) return;
                this.isDragging = false;
    
                const diff = this.startX - this.currentX;
                if (diff > 50) {
                    this.setCurrentState('next');
                } else if (diff < -50) {
                    this.setCurrentState('previous');
                }   
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

const perspectiveSlider = new Carousel(document.getElementById('perspectives-4'));
perspectiveSlider.updateGallery();
perspectiveSlider.useControls();