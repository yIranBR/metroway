const arrowBtn = document.querySelectorAll('.arrow-btn');
const controlBtn = document.querySelectorAll('.control-btn');

const controlBtnAnim = function(btn) {
    btn.style.transform = 'scale(.9)';
    btn.style.opacity = '.5';
    setTimeout(()=> {
        btn.style.transform = 'scale(1)';
        btn.style.opacity = '1';
    }, 350)
}

arrowBtn.forEach((btn) => {
    btn.addEventListener('click', ()=> {
        controlBtnAnim(btn);
    })
})
controlBtn.forEach((btn) => {
    btn.addEventListener('click', ()=> {
        controlBtnAnim(btn);
    })
})

//Swiper container
let oldx = 0;
const btnFluidTool = document.getElementById('fluid-tool-mouse');
const moveOnFluidTool = (e, o) => {
        btnFluidTool.style.opacity = '0';
        e.pageX > oldx && 1 == mouseDown ? fluidNextImage(o) : e.pageX < oldx && 1 == mouseDown && fluidPreviousImage(o), oldx = e.pageX
    },
    fluidPreviousImage = e => {
        fluidToolIndex = e.getAttribute("fluid-tool-index") || 0, fluidToolIndex > 1 && fluidToolIndex--, setFluidToolIndex(fluidToolIndex, e)
    },
    fluidNextImage = e => {
        fluidToolIndex = e.getAttribute("fluid-tool-index") || 0, fluidToolIndex < e.children.length - 1 && fluidToolIndex++, setFluidToolIndex(fluidToolIndex, e)
    },
    setFluidToolIndex = (e, o) => {
        let t = o.getElementsByClassName("fluid-tool-item active");
        [].forEach.call(t, e => {
            e.classList.remove("active")
        }), o.children[e].classList.add("active"), o.setAttribute("fluid-tool-index", e)
    };
HTMLElement.prototype.fluidTool = function () {
    this.onmousedown = (e => {
        e.target.innerHTML = ""
    }), this.addEventListener("mousemove", e => {
        moveOnFluidTool(e, this)
    }), this.addEventListener("mousedown", e => {
        mouseDown = 1
    }), this.addEventListener("mouseup", e => {
        mouseDown = 0
    }), this.addEventListener("mouseout", e => {
        mouseDown = 0
    }), this.addEventListener("touchmove", e => {
        moveOnFluidTool(e.changedTouches[0], this)
    }), this.addEventListener("touchstart", e => {
        e.target.innerHTML = "", mouseDown = 1
    }), this.addEventListener("touchend", e => {
        mouseDown = 0
    })
};

const initComparisons = () => {
    let x, i;
    x = document.getElementsByClassName("img-comp-overlay");
    for (i = 0; i < x.length; i++) {
        compareImages(x[i]);
    }
    window.addEventListener('mousemove',evt=>{
        let images = document.querySelectorAll(".img-comp-img img");
        images.forEach(element=>{
            element.style.width=images[0].parentElement.clientWidth+"px";
        })
    });

    function compareImages(img) {
        let slider, clicked = 0, w, h;
        w = img.offsetWidth;
        h = img.offsetHeight;
        img.style.width = (w / 2) + "px";
        slider = document.createElement("DIV");
        slider.setAttribute("class", "img-comp-slider");
        img.parentElement.insertBefore(slider, img);
        slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
        slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";
        slider.addEventListener("mousedown", slideReady);
        window.addEventListener("mouseup", slideFinish);
        slider.addEventListener("touchstart", slideReady);
        window.addEventListener("touchend", slideFinish);

        function slideReady(e) {
            e.preventDefault();
            clicked = 1;
            window.addEventListener("mousemove", slideMove);
            window.addEventListener("touchmove", slideMove);
        }

        function slideFinish() {
            clicked = 0;
        }

        function slideMove(e) {
            let pos;
            if (clicked == 0) return false;
            pos = getCursorPos(e);
            if (pos < 0) pos = 0;
            if (pos > w) pos = w;
            slide(pos);

            updatePlayPauseButton();
        }

        function getCursorPos(e) {
            let a, x = 0;
            e = (e.changedTouches) ? e.changedTouches[0] : e;
            a = img.getBoundingClientRect();
            x = e.pageX - a.left;
            x = x - window.pageXOffset;
            return x;
        }

        function slide(x) {
            img.style.width = x + "px";
            slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
        }
    }
}

function Timer(fn, t) {
    var timerObj = setInterval(fn, t);

    this.stop = function() {
        if (timerObj) {
            clearInterval(timerObj);
            timerObj = null;
        }
        return this;
    }

    // start timer using current settings (if it's not already running)
    this.start = function() {
        if (!timerObj) {
            this.stop();
            timerObj = setInterval(fn, t);
        }
        return this;
    }

    // start with new or original interval, stop current interval
    this.reset = function(newT = t) {
        t = newT;

        return this.stop().start();
    }
}

const initProjects = () => {
    const urlParams = new URLSearchParams(window.location.search);
    
    const pageParam = urlParams.get('page'); 
    if(pageParam!=null)
        gotoPage(pageParam);

    let elements;
    let windowHeight;


    elements = document.querySelectorAll('.hidden');
    windowHeight = window.innerHeight;
    
    window.addEventListener('mousemove',evt=>{
        let images = document.querySelectorAll(".img-comp-img img");
        images.forEach(element=>{
            element.style.width=images[0].parentElement.clientWidth+"px";
        })
    });

    window.addEventListener("scroll", () => {
        for (let i = 0; i < elements.length; i++) {
            let element = elements[i];
            let positionFromTop = elements[i].getBoundingClientRect().top;

            if (positionFromTop - windowHeight <= 0) {
                element.classList.add('fade-in-element');
                element.classList.remove('hidden');
            }
        }

        elements2=document.querySelectorAll('.hidden-2');

        for (let i = 0; i < elements2.length; i++) {
            let element = elements2[i];
            let positionFromTop = element.getBoundingClientRect().top;

            if (positionFromTop - windowHeight <= 0) {
                element.classList.add('fade-in-element-'+i);
                element.classList.remove('hidden-2');
            }
        }
    });
    initComparisons();
    document.getElementById('fluidTool').fluidTool();

// Função para alternar o autoplay
const toggleAutoPlay = (container) => {
    if (isPlaying) {
        stopAutoPlay();
    } else {
        startAutoPlay(container);
    }
    isPlaying = !isPlaying;
    updatePlayPauseButton();
};

        // Referência ao botão de play/pause existente
        const playPauseButton = document.getElementById('playPauseSlide');
        const playPauseBtnImg = playPauseButton.querySelector('img');
        let autoPlayInterval = null; // Intervalo do autoplay
        let isPlaying = false; // Controle do estado de reprodução
        let fluidToolIndex = 0; // Índice inicial do frame

        // Função para atualizar o ícone e a classe do botão de play/pause
        const updatePlayPauseButton = () => {
            playPauseBtnImg.src = isPlaying ? './storage/content/icons/video-controler/pause-btn-icon.svg' : './storage/content/icons/video-controler/play-btn-icon.svg';
            if (isLastFrame()) {
                playPauseBtnImg.src = './storage/content/icons/video-controler/play-btn-icon.svg';
            }
            playPauseButton.classList.toggle('blocked', isLastFrame()); // Adiciona ou remove a classe bloqueada
            isPlaying = (playPauseButton.classList.contains('blocked') ? false : true);
        };

// Função para verificar se o índice atual está no último frame
const isLastFrame = () => {
    const container = document.getElementById('fluidTool');
    return fluidToolIndex === container.children.length - 1;
};

// Função para iniciar o autoplay
const startAutoPlay = (container) => {
    if (!autoPlayInterval) { // Evita múltiplos intervalos
        autoPlayInterval = setInterval(() => {
            fluidNextImage(container); // Próxima imagem
        }, 15); // Define o tempo entre cada frame (ajustável)
    }
};

// Função para parar o autoplay
const stopAutoPlay = () => {
    clearInterval(autoPlayInterval);
    autoPlayInterval = null;
};

// Função atualizada para a próxima imagem que verifica se é o último frame
const fluidNextImage = (container) => {
    if (fluidToolIndex < container.children.length - 1) {
        fluidToolIndex++;
        setFluidToolIndex(fluidToolIndex, container);
    } else {
        stopAutoPlay();
    }
};

// Função para o índice da imagem atual
const setFluidToolIndex = (index, container) => {
    let activeItems = container.getElementsByClassName("fluid-tool-item active");
    [].forEach.call(activeItems, item => {
        item.classList.remove("active");
    });
    container.children[index].classList.add("active");
    container.setAttribute("fluid-tool-index", index);
    fluidToolIndex = index;
    updatePlayPauseButton(); // Atualiza o botão caso a navegação seja manual
};

// Evento de clique para o botão play/pause
playPauseButton.addEventListener('click', () => {
    const container = document.getElementById('fluidTool'); // Container do efeito de frames
    if (!playPauseButton.classList.contains('blocked')) {
        toggleAutoPlay(container);
    }
});

// Função fluidTool com alterações
HTMLElement.prototype.fluidTool = function () {
    this.onmousedown = (e => {
        e.target.innerHTML = ""
    });
    this.addEventListener("mousemove", e => {
        moveOnFluidTool(e, this);
    });
    this.addEventListener("mousedown", () => {
        mouseDown = 1;
    });
    this.addEventListener("mouseup", () => {
        mouseDown = 0;
    });
    this.addEventListener("mouseout", () => {
        mouseDown = 0;
    });
    this.addEventListener("touchmove", e => {
        moveOnFluidTool(e.changedTouches[0], this);
    });
    this.addEventListener("touchstart", e => {
        e.target.innerHTML = "";
        mouseDown = 1;
    });
    this.addEventListener("touchend", () => {
        mouseDown = 0;
    });
};

// Inicializa o efeito de frames
document.getElementById('fluidTool').fluidTool();


}