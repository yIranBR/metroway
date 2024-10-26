const panoramaContainer = document.querySelector('#view-3 .main-content-list');
const nextPanoramaBtn = document.getElementById('next-floor-view');
const prevPanoramaBtn = document.getElementById('prev-floor-view');
const legendPano = document.querySelector('#view-3 .view-legend p');
const btnController = document.querySelector('#viewer-slider p');
const indicator = document.querySelector('#viewer-controller .indicator');
const indicatorP = indicator.querySelector('p');

let currentPanoramaIndex = 0;
const totalPanoramas = 4;
const panoramaHeight = 100;
const initialOffset = -150;

const vwHeight = [8, 15.7, 20.3, 26.4];
const andaresNumeros = [5, 10, 13, 17];
const andaresLegend = [`do Andar ${andaresNumeros[0]}º`, `do Andar ${andaresNumeros[1]}º`, `do Andar ${andaresNumeros[2]}º`, "da Cobertura"];

function updatePanoramaPosition() {
    const offset = currentPanoramaIndex * panoramaHeight;
    panoramaContainer.style.transform = `translateY(${initialOffset + offset}%)`;
    legendPano.textContent = `Vista Panorâmica ${andaresLegend[currentPanoramaIndex]}`;
    btnController.textContent = `${andaresNumeros[currentPanoramaIndex]}º`;
    indicator.style.marginTop = `-${vwHeight[currentPanoramaIndex]}vw`;
    indicatorP.textContent = `${andaresNumeros[currentPanoramaIndex]}º`;
}

nextPanoramaBtn.addEventListener('click', function() {
    if (currentPanoramaIndex < totalPanoramas - 1) {
        currentPanoramaIndex++;
        updatePanoramaPosition();
    } else {
        currentPanoramaIndex = 0;
        updatePanoramaPosition();
    }
});

prevPanoramaBtn.addEventListener('click', function() {
    if (currentPanoramaIndex > 0) {
        currentPanoramaIndex--;
        updatePanoramaPosition();
    } else {
        currentPanoramaIndex = totalPanoramas - 1;
        updatePanoramaPosition();
    }
});