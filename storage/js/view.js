//Importação pano
function krpano_onready_callback(krpano_interface)
{
    krpano = krpano_interface;
}

var krpano = null;

embedpano({
    swf : "../../../krpano.swf",
    id : "krpanoSWFObject", 
    xml : "./storage/library/panos/tour.xml", 
    target : "pano", 
    consolelog : true,					// trace krpano messages also to the browser console
    passQueryParameters : true, 		// pass query parameters of the url to krpano
    onready : krpano_onready_callback
});


function krpano_onready_callback(krpano_interface)
{
    krpano = krpano_interface;
}


function webscene(scenename,h,v,f) {
    if (krpano) {
        krpano.call("loadscene(" + scenename + ", null, MERGE, BLEND(0.5));lookat("+h+","+v+","+f+")   ;");
    }
}

const panos = [
    "scene_d_5_PAVIMENTO",
    "scene_c_10_PAVIMENTO_",
    "scene_b_13_PAVIMENTO",
    "scene_a_Rooftop"
]

let currentPanoramaIndex = 0;
webscene(panos[currentPanoramaIndex]);

//Inicio do código
const panoramaContainer = document.querySelector('#view-3 .main-content-list');
const nextPanoramaBtn = document.getElementById('next-floor-view');
const prevPanoramaBtn = document.getElementById('prev-floor-view');
const legendPano = document.querySelector('#view-3 .view-legend p');
const btnController = document.querySelector('#viewer-slider p');
const indicator = document.querySelector('#viewer-controller .indicator');
const indicatorP = indicator.querySelector('p');

const totalPanoramas = 4;
const panoramaHeight = 100;
const initialOffset = -150;

const vwHeight = [8, 15.7, 20.3, 26.4];
const andaresNumeros = [5, 10, 13, 17];
const andaresLegend = [`do Andar ${andaresNumeros[0]}º`, `do Andar ${andaresNumeros[1]}º`, `do Andar ${andaresNumeros[2]}º`, "da Cobertura"];

function updatePanoramaPosition() {
    webscene(panos[currentPanoramaIndex]);
    
    legendPano.style.opacity = '0';
    btnController.style.opacity = '0';
    indicatorP.style.opacity = '0';

    setTimeout(() => {
        legendPano.textContent = `Vista Panorâmica ${andaresLegend[currentPanoramaIndex]}`;
        btnController.textContent = `${andaresNumeros[currentPanoramaIndex]}º`;
        indicatorP.textContent = `${andaresNumeros[currentPanoramaIndex]}º`;
        indicator.style.marginTop = `-${vwHeight[currentPanoramaIndex]}vw`;

        legendPano.style.opacity = '1';
        btnController.style.opacity = '1';
        indicatorP.style.opacity = '1';
    }, 500);
}

nextPanoramaBtn.addEventListener('click', function() {
    if (currentPanoramaIndex < totalPanoramas - 1) {
        currentPanoramaIndex++;
        updatePanoramaPosition();
        prevPanoramaBtn.classList.remove('blocked');
        if (currentPanoramaIndex == (totalPanoramas - 1)) {
            nextPanoramaBtn.classList.add('blocked');
        }
    }
});

prevPanoramaBtn.addEventListener('click', function() {
    if (currentPanoramaIndex > 0) {
        currentPanoramaIndex--;
        updatePanoramaPosition();
        nextPanoramaBtn.classList.remove('blocked');
        if (currentPanoramaIndex == 0) {
            prevPanoramaBtn.classList.add('blocked');
        }
    }
});