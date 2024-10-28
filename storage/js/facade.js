const popupFacade = document.getElementById('facadePopupContainer');
const popupFacadeSliders = popupFacade.querySelectorAll('.gallery-item');
const openPopupFacade = document.getElementById('openPopupBtnFacade');
const closePopupFacade = popupFacade.querySelector('.closePopupBtn');

class FacadeSlider {
    constructor(container) {
        this.container = container;
        this.carouselContainer = this.container.querySelector('.gallery-container');
        this.carouselArrayContainer = this.container.querySelectorAll('.gallery-item');
        this.carouselArray = [...this.carouselArrayContainer];
        this.popupArray = [...popupFacadeSliders];
        this.backSlide = this.container.querySelector('.backSlide');
        this.nextSlide = this.container.querySelector('.nextSlide');
        this.playPauseButton = this.container.querySelector('#playPauseSlide');
        
        this.isPlaying = false;
        this.autoPlayInterval = null;
        this.isTransitioning = false;
        this.isButtonDisabled = false;
        this.openPopup = false;

        this.useControls();
        this.updateGallery();

        openPopupFacade.addEventListener('click', () => this.togglePopup());
        closePopupFacade.addEventListener('click', () => this.togglePopup());
    }
  
    togglePopup() {
        popupFacade.classList.toggle('close');
        this.openPopup = !this.openPopup;
        this.updateGallery(); // Atualiza a galeria conforme o estado do popup
    }

    updateGallery() {
        // Define o índice inicial para o popup sincronizado com o slider principal
        this.carouselArray.forEach((el, i) => {
            // Remove classes e define invisibilidade para todas as imagens
            el.classList.remove('gallery-item-1', 'gallery-item-2', 'gallery-item-3', 'gallery-item-4', 'gallery-item-5');
            this.popupArray[i].classList.remove('gallery-item-1', 'gallery-item-2', 'gallery-item-3', 'gallery-item-4', 'gallery-item-5');
            el.style.visibility = 'hidden';
            this.popupArray[i].style.visibility = 'hidden';
        });
    
        // Mostra a imagem atual no slider principal
        this.carouselArray[0].classList.add('gallery-item-1');
        this.carouselArray[0].style.visibility = 'visible';
    
        // Verifica se o popup está aberto e mostra a mesma imagem no popup
        if (this.openPopup) {
            this.popupArray[0].classList.add('gallery-item-1');
            this.popupArray[0].style.visibility = 'visible';
        }
    }  
  
    setCurrentState(direction) {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        
        if (direction === 'previous') {
            this.carouselArray.unshift(this.carouselArray.pop());
            this.popupArray.unshift(this.popupArray.pop());
        } else if (direction === 'next') {
            this.carouselArray.push(this.carouselArray.shift());
            this.popupArray.push(this.popupArray.shift());
        }
  
        this.updateGallery();
        setTimeout(() => {
            this.isTransitioning = false;
        }, 1000);
    }
  
    useControls() {
        this.backSlide.addEventListener('click', (e) => {
            e.preventDefault();
            if (!this.isTransitioning) {
                this.setCurrentState('next');
                this.stopAutoPlay();
            }
        });
    
        this.nextSlide.addEventListener('click', (e) => {
            e.preventDefault();
            if (!this.isTransitioning) {
                this.setCurrentState('previous');
                this.stopAutoPlay();
            }
        });
    
        this.playPauseButton.addEventListener('click', () => {
            if (this.isButtonDisabled) return;

            if (this.isPlaying) {
                this.stopAutoPlay();
            } else {
                this.startAutoPlay();
            }

            this.isButtonDisabled = true;
            setTimeout(() => {
                this.isButtonDisabled = false;
            }, 500);
        });
    }

    startAutoPlay() {
        this.stopAutoPlay();
        this.isPlaying = true;
        this.playPauseButton.querySelector('img').src = "./storage/content/icons/video-controler/pause-btn-icon.svg";
        
        this.autoPlayInterval = setInterval(() => {
            this.setCurrentState('next');
        }, 2000);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
        this.isPlaying = false;
        this.playPauseButton.querySelector('img').src = "./storage/content/icons/video-controler/play-btn-icon.svg";
    }
}
  
const facadeSlider = new FacadeSlider(document.getElementById('facade-2'));
facadeSlider.updateGallery();
facadeSlider.useControls();
facadeSlider.startAutoPlay();
