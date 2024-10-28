const popupFacade = document.getElementById('facadePopupContainer');
const popupFacadeSliders = popupFacade.querySelectorAll('.fluid-tool-item');
const openPopupFacade = document.getElementById('openPopupBtnFacade');
const closePopupFacade = popupFacade.querySelector('.closePopupBtn');
const playPauseSlidePopup = document.getElementById('playPauseSlidePopup');
const playPauseSlidePopupImg = playPauseSlidePopup.querySelector('img');
const fluidToolPopup = document.getElementById('fluidToolPopup');

let isPlaying = false;
let autoPlayInterval = null; // Intervalo para autoplay
let fluidToolIndex = 0; // Índice da imagem atual

// Função para abrir o popup
openPopupFacade.addEventListener('click', () => {
    popupFacade.classList.remove('close'); // Adiciona a classe para mostrar o popup
    synchronizeFluidTool(); // Chama a função para sincronizar
});

// Função para fechar o popup e sincronizar o estado
closePopupFacade.addEventListener('click', () => {
    popupFacade.classList.add('close'); // Remove a classe para esconder o popup
    synchronizeMainFluidTool(); // Sincroniza o fluidTool principal
    stopAutoPlay(); // Para o autoplay ao fechar
});

// Função para sincronizar o estado do FluidTool principal com o popup
function synchronizeMainFluidTool() {
    const fluidTool = document.getElementById('fluidTool');
    const activeIndex = fluidToolPopup.getAttribute('fluid-tool-index');

    // Atualiza o índice e o frame ativo no fluidTool principal
    fluidTool.setAttribute('fluid-tool-index', activeIndex);
    const fluidToolItems = fluidTool.querySelectorAll('.fluid-tool-item');

    fluidToolItems.forEach((item, index) => {
        item.classList.toggle('active', index == activeIndex); // Define ativo apenas o item sincronizado
    });
}

// Função para sincronizar o estado do FluidTool com o popup
function synchronizeFluidTool() {
    // Obtenha o índice do item ativo e subtrai 1 para evitar ultrapassar o limite
    const currentIndex = document.querySelector('#fluidTool').getAttribute('fluid-tool-index') - 1;
    
    // Define o índice como zero se for menor que zero
    const adjustedIndex = currentIndex < 0 ? 0 : currentIndex;

    // Atualiza os sliders do popup de acordo com o índice sincronizado
    popupFacadeSliders.forEach((slider, index) => {
        slider.classList.remove('active'); // Remove a classe active de todos os itens
        if (index === adjustedIndex) {
            popupFacadeSliders[adjustedIndex].classList.add('active'); // Adiciona a classe active ao item correspondente no popup
        }
    });
}

// Função para verificar se o índice atual está no último frame
const isLastFrame = () => {
    return fluidToolIndex === popupFacadeSliders.length - 1; // Verifica se é o último frame
};

// Função para iniciar o autoplay
const startAutoPlay = () => {
    // Reinicia o índice se estiver no último frame
    if (isLastFrame()) {
        fluidToolIndex = 0;
        setFluidToolIndex2(fluidToolIndex, popupFacadeSliders);
    }

    // Evita múltiplos intervalos
    if (!autoPlayInterval) {
        autoPlayInterval = setInterval(() => {
            fluidNextImage2(popupFacadeSliders); // Próxima imagem
        }, 15); // Define o tempo entre cada frame (ajustável)
    }
};

// Função para parar o autoplay
const stopAutoPlay = () => {
    clearInterval(autoPlayInterval);
    autoPlayInterval = null;
};

// Função atualizada para a próxima imagem que verifica se é o último frame
const fluidNextImage2 = (container) => {
    if (fluidToolIndex < container.length - 1) {
        fluidToolIndex++;
        setFluidToolIndex2(fluidToolIndex, container);
    } else {
        stopAutoPlay();
    }
};

// Função para atualizar o ícone e a classe do botão de play/pause
const updatePlayPauseButton2 = () => {
    playPauseSlidePopupImg.src = isPlaying ? './storage/content/icons/video-controler/pause-btn-icon.svg' : './storage/content/icons/video-controler/play-btn-icon.svg';
    playPauseSlidePopup.classList.toggle('blocked', isLastFrame()); // Adiciona ou remove a classe bloqueada
    if (isLastFrame()) {
        playPauseSlidePopupImg.src = './storage/content/icons/video-controler/play-btn-icon.svg';
        playPauseSlidePopup.classList.add('blocked');
    }
    isPlaying = (playPauseSlidePopup.classList.contains('blocked') ? false : true);
};

// Função para o índice da imagem atual
const setFluidToolIndex2 = (index, container) => {
    // Remove a classe active de todos os itens
    console.log(index);
    container.forEach(item => item.classList.remove("active"));
    container[index].classList.add("active"); // Adiciona a classe active ao item correspondente
    fluidToolPopup.setAttribute("fluid-tool-index", index); // Atualiza o índice no container
    fluidToolIndex = index; // Atualiza o índice global
    updatePlayPauseButton2(); // Atualiza o botão caso a navegação seja manual
};

// Função para controlar o play/pause
playPauseSlidePopup.addEventListener('click', () => {
    // Verifique se o botão está bloqueado antes de alternar o estado de reprodução
    if (!playPauseSlidePopup.classList.contains('blocked')) {
        isPlaying = !isPlaying; // Alterna o estado de reprodução
        playPauseSlidePopupImg.src = isPlaying 
            ? './storage/content/icons/video-controler/pause-btn-icon.svg' 
            : './storage/content/icons/video-controler/play-btn-icon.svg';

        if (isPlaying) {
            startAutoPlay(); // Inicia o autoplay
        } else {
            stopAutoPlay(); // Para o autoplay
        }
    }
});

// Funções para iniciar e parar o slideshow
function startSlideShow() {
    console.log('começou slider');
    startAutoPlay(); // Inicia o autoplay
}

function stopSlideShow() {
    console.log('parou slider');
    stopAutoPlay(); // Para o autoplay
}

// Função para inicializar o arrastar no fluidTool principal e popupFacade
function initDragFunctionality2() {
    const fluidTool = document.getElementById('fluidTool');
    const fluidToolItems = fluidTool.querySelectorAll('.fluid-tool-item');
    const popupFacadeContainer = popupFacade;
    const popupFacadeItems = popupFacadeSliders;

    let startX, isDragging = false;

    // Função de início do arrasto (para mouse e toque)
    function onDragStart(e) {
        isDragging = true;
        startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX; // Usa o ponto de toque em vez do mouse
        document.addEventListener('mousemove', onDragMove);
        document.addEventListener('mouseup', onDragEnd);
        document.addEventListener('touchmove', onDragMove);
        document.addEventListener('touchend', onDragEnd);
    }

    // Função para o movimento do arrasto
    function onDragMove(e) {
        if (!isDragging) return;

        const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX; // Obtém a posição correta dependendo do evento
        const deltaX = clientX - startX;
        const threshold = 50; // Define o limite para mudar de slide

        if (deltaX > threshold) {
            fluidPrevImage2(fluidToolItems); // Move para imagem anterior
            fluidPrevImage2(popupFacadeItems); // Sincroniza com popup
            startX = clientX;
        } else if (deltaX < -threshold) {
            fluidNextImage2(fluidToolItems); // Move para a próxima imagem
            fluidNextImage2(popupFacadeItems); // Sincroniza com popup
            startX = clientX;
        }
    }

    // Funções de navegação para mover entre imagens (sincronizando ambos)
    function fluidPrevImage2(container) {
        if (fluidToolIndex > 0) {
            fluidToolIndex--;
            setFluidToolIndex2(fluidToolIndex, container);
        }
    }

    function fluidNextImage2(container) {
        if (fluidToolIndex < container.length - 1) {
            fluidToolIndex++;
            setFluidToolIndex2(fluidToolIndex, container);
        }
    }

    // Função para finalizar o arrasto
    function onDragEnd() {
        isDragging = false;
        document.removeEventListener('mousemove', onDragMove);
        document.removeEventListener('mouseup', onDragEnd);
        document.removeEventListener('touchmove', onDragMove);
        document.removeEventListener('touchend', onDragEnd);
    }

    // Inicia o evento de arrasto no fluidTool principal e no popupFacade
    fluidTool.addEventListener('mousedown', onDragStart);
    popupFacadeContainer.addEventListener('mousedown', onDragStart);
    fluidTool.addEventListener('touchstart', onDragStart);
    popupFacadeContainer.addEventListener('touchstart', onDragStart);
}

// Inicializa o arrastar ao carregar
initDragFunctionality2();