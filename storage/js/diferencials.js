const diferencialsData = [
    {
        title: "Fechadura Digital",
        subtitle: "Alguma observação",
        paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ultrices est vitae massa aliquet volutpat. Etiam justo nisi, iaculis quis bibendum in, laoreet id erat. Etiam eleifend sapien id diam eleifend ornare. Sed eget nulla lectus. Pellentesque dictum metus quis arcu porta varius vulputate non elit.",
        brief: "Texto breve sobre a fechadura digital.",
        imgSrc: "./storage/content/sections/7-diferencials/1-img.png"
    },
    {
        title: "Câmera de Segurança",
        subtitle: "Alguma observação 2",
        paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis ex quis metus accumsan, ut tincidunt leo vestibulum. Aenean tincidunt massa vel feugiat tempor. Maecenas sed turpis eget metus convallis vestibulum. Integer et lorem dictum.",
        brief: "Texto breve sobre a câmera de segurança.",
        imgSrc: "./storage/content/sections/7-diferencials/2-img.jpg"
    },
    {
        title: "Portão Automático",
        subtitle: "Alguma observação 3",
        paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus quam id eros dictum, non dignissim ex molestie. Praesent sed turpis bibendum, tincidunt sapien vitae, varius felis. Aenean vel tortor vitae nisi sodales ultricies.",
        brief: "Texto breve sobre o portão automático.",
        imgSrc: "./storage/content/sections/7-diferencials/3-img.jpg"
    }
];

let currentIndex = 0;

const titleElement = document.querySelector('#diferencials-7 .txt-group h2');
const subtitleElement = document.querySelector('#diferencials-7 .txt-group p.fw-regular.fs-18');
const paragraphElement = document.querySelector('#diferencials-7 .txt-group p.fw-regular.fs-21');
const imgElement = document.querySelector('#diferencials-7 .img-header img');

function updateContent(index) {
    const currentDiferencial = diferencialsData[index];
    titleElement.textContent = currentDiferencial.title;
    subtitleElement.textContent = currentDiferencial.subtitle;
    paragraphElement.textContent = currentDiferencial.paragraph;
    imgElement.src = currentDiferencial.imgSrc;
}

function nextDiferencial() {
    currentIndex = (currentIndex + 1) % diferencialsData.length; // Vai para o próximo, e volta ao início se for o último
    updateContent(currentIndex);
}
function prevDiferencial() {
    currentIndex = (currentIndex - 1 + diferencialsData.length) % diferencialsData.length; // Vai para o anterior, e volta ao fim se for o primeiro
    updateContent(currentIndex);
}

document.querySelectorAll('#diferencials-7 .arrow-btn')[0].addEventListener('click', prevDiferencial); // Botão para voltar
document.querySelectorAll('#diferencials-7 .arrow-btn')[1].addEventListener('click', nextDiferencial); // Botão para avançar

updateContent(currentIndex);