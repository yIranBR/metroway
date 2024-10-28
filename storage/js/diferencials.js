const titleElement = document.querySelector('#diferencials-7 .txt-group h2');
const subtitleElement = document.querySelector('#diferencials-7 .txt-group p.fw-regular.fs-18');
const paragraphElement = document.querySelector('#diferencials-7 .txt-group p.fw-regular.fs-21');
const imgElements = document.querySelectorAll('#diferencials-7 .img-header .gallery-item');

const popupDiferencials = document.getElementById('diferencialsPopupContainer');
const popupDiferencialsSlide = popupDiferencials.querySelectorAll('.gallery-item');
const openPopupDiferencials = document.getElementById('openPopupBtnDiferencials');
const closePopupDiferencials = popupDiferencials.querySelector('.closePopupBtn');

let currentIndex = 1;

function updateContent(index) {
    currentIndex = (index + imgElements.length) % imgElements.length;

    imgElements.forEach((img, i) => {
        img.style.opacity = (i === currentIndex ? '1' : '0');
    });
    
    popupDiferencialsSlide.forEach((slide, i) => {
        slide.style.opacity = (i === currentIndex ? '1' : '0');
    });

    const activeImg = imgElements[currentIndex];

    titleElement.style.opacity = '0';
    subtitleElement.style.opacity = '0';
    paragraphElement.style.opacity = '0';

    setTimeout(() => {
        titleElement.textContent = activeImg.getAttribute('data-title');
        subtitleElement.textContent = activeImg.getAttribute('data-subtitle');
        paragraphElement.textContent = activeImg.getAttribute('data-paragraph');

        titleElement.style.opacity = '1';
        subtitleElement.style.opacity = '1';
        paragraphElement.style.opacity = '1';
    }, 500);
}

function nextDiferencial() {
    updateContent(currentIndex + 1);
}

function prevDiferencial() {
    updateContent(currentIndex - 1);
}

document.querySelectorAll('#diferencials-7 .arrow-btn')[0].addEventListener('click', prevDiferencial);
document.querySelectorAll('#diferencials-7 .arrow-btn')[1].addEventListener('click', nextDiferencial);

popupDiferencials.querySelector('.prev-slide').addEventListener('click', prevDiferencial);
popupDiferencials.querySelector('.next-slide').addEventListener('click', nextDiferencial);

updateContent(currentIndex);

openPopupDiferencials.addEventListener('click', () => {
    popupDiferencials.classList.remove('close');
});

closePopupDiferencials.addEventListener('click', () => {
    popupDiferencials.classList.add('close');
});
