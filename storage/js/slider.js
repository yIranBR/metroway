class Carousel {
    constructor(container) {
      this.container = container;
      this.carouselContainer = this.container.querySelector('.gallery-container');
      this.carouselArrayContainer = this.container.querySelectorAll('.gallery-item');
      this.carouselArray = [...this.carouselArrayContainer];
      this.backSlide = this.container.querySelector('#backSlide');
      this.nextSlide = this.container.querySelector('#nextSlide');
      this.legend = this.container.querySelector('p');
    }
  
    updateGallery() {
      this.carouselArray.forEach((el) => {
        el.classList.remove('gallery-item-1', 'gallery-item-2', 'gallery-item-3', 'gallery-item-4', 'gallery-item-5');
      });
  
      this.carouselArray.slice(0, 5).forEach((el, i) => {
        el.classList.add(`gallery-item-${i + 1}`);
      });
  
      this.updateLegend();
    }
  
    updateLegend() {
      // Encontrar o item no meio (gallery-item-3)
      const activeSlide = this.carouselArray.find(el => el.classList.contains('gallery-item-3'));
      
      // Atualizar o parágrafo com o valor de data-legend do slide ativo
      this.legend.textContent = activeSlide.getAttribute('data-legend');
    }
  
    setCurrentState(direction) {
      if (direction === 'previous') {
        // Move o último item para o início
        this.carouselArray.unshift(this.carouselArray.pop());
      } else if (direction === 'next') {
        // Move o primeiro item para o final
        this.carouselArray.push(this.carouselArray.shift());
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
  }
  
const exampleCarousel = new Carousel(document.getElementById('perspectives-4'));
exampleCarousel.updateGallery();
exampleCarousel.useControls();