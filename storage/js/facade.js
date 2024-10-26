class FacadeSlider {
    constructor(container) {
        this.container = container;
        this.carouselContainer = this.container.querySelector('.gallery-container');
        this.carouselArrayContainer = this.container.querySelectorAll('.gallery-item');
        this.carouselArray = [...this.carouselArrayContainer];
        this.backSlide = this.container.querySelector('.backSlide');
        this.nextSlide = this.container.querySelector('.nextSlide');
        this.playPauseButton = this.container.querySelector('#playPauseSlide');
        
        this.isDragging = false;
        this.isPlaying = false;
        this.autoPlayInterval = null;
        this.isTransitioning = false;
        this.isButtonDisabled = false;

        this.initDragEvents();
        this.useControls();
    }
  
    updateGallery() {
        this.carouselArray.forEach((el) => {
            el.classList.remove('gallery-item-1', 'gallery-item-2', 'gallery-item-3', 'gallery-item-4', 'gallery-item-5');
        });
  
        this.carouselArray.slice(0, 5).forEach((el, i) => {
            el.classList.add(`gallery-item-${i + 1}`);
        });
    }
  
    setCurrentState(direction) {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        
        if (direction === 'previous') {
            this.carouselArray.unshift(this.carouselArray.pop());
        } else if (direction === 'next') {
            this.carouselArray.push(this.carouselArray.shift());
        }
  
        this.updateGallery();
        setTimeout(() => {
            this.isTransitioning = false;
        }, 500);
    }
  
    useControls() {
        this.backSlide.addEventListener('click', (e) => {
            e.preventDefault();
            this.setCurrentState('next');
            this.stopAutoPlay();
        });
    
        this.nextSlide.addEventListener('click', (e) => {
            e.preventDefault();
            this.setCurrentState('previous');
            this.stopAutoPlay();
        });
    
        this.playPauseButton.addEventListener('click', () => {
            if (this.isButtonDisabled) return;

            if (this.isPlaying) {
                this.stopAutoPlay();
                console.log('pause');
            } else {
                this.startAutoPlay();
                console.log('play');
            }

            this.isButtonDisabled = true;
            setTimeout(() => {
                this.isButtonDisabled = false;
            }, 500);
        });
    }

    startAutoPlay() {
        this.stopAutoPlay(); // Garante que qualquer intervalo anterior seja encerrado
        this.isPlaying = true;
        this.playPauseButton.querySelector('img').src = "./storage/content/icons/video-controler/pause-btn-icon.svg";
        
        this.autoPlayInterval = setInterval(() => {
            this.setCurrentState('next');
        }, 2000);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval); // Limpa qualquer intervalo ativo
            this.autoPlayInterval = null;
        }
        this.isPlaying = false;
        this.playPauseButton.querySelector('img').src = "./storage/content/icons/video-controler/play-btn-icon.svg";
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
            this.stopAutoPlay();
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
            this.stopAutoPlay();
        });
    }
}
  
const facadeSlider = new FacadeSlider(document.getElementById('facade-2'));
facadeSlider.updateGallery();
facadeSlider.useControls();
facadeSlider.startAutoPlay();