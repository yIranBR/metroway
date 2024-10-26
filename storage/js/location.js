class LocationSlider {
    constructor(container) {
        this.container = container;
        this.carouselContainer = this.container.querySelector('.gallery-container');
        this.carouselArrayContainer = this.container.querySelectorAll('.gallery-item');
        this.carouselArray = [...this.carouselArrayContainer];
        this.legendElement = this.container.querySelector('h2');
        this.textElement = this.container.querySelector('p');

        this.isDragging = false;
        this.startX = 0;
        this.currentX = 0;

        this.initDragEvents();
        this.updateGallery();
    }

    updateGallery() {
        // Remove todas as classes de posição dos slides
        this.carouselArray.forEach((el) => {
            el.classList.remove('gallery-item-1', 'gallery-item-2', 'gallery-item-3', 'gallery-item-4', 'gallery-item-5');
        });

        // Aplica as classes de posição com base nos primeiros 5 itens
        this.carouselArray.slice(0, 5).forEach((el, i) => {
            el.classList.add(`gallery-item-${i + 1}`);
        });

        // Atualiza a legenda e o texto
        this.updateLegend();
    }

    updateLegend() {
        // Encontra o slide ativo (aquele que está na posição `gallery-item-3`)
        const activeSlide = this.carouselArray.find(el => el.classList.contains('gallery-item-3'));

        // Atualiza o conteúdo do `h2` e `p` com os dados do slide ativo
        this.legendElement.textContent = activeSlide.getAttribute('data-legend');
        this.textElement.textContent = activeSlide.getAttribute('data-text');
    }

    setCurrentState(direction) {
        if (direction === 'previous') {
            this.carouselArray.unshift(this.carouselArray.pop());
        } else if (direction === 'next') {
            this.carouselArray.push(this.carouselArray.shift());
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

// Instancia o slider e inicia a galeria
const locationSlider = new LocationSlider(document.getElementById('location-6'));
