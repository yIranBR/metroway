const openPopupBtn = document.getElementById('openPopupBtn');
const closePopupBtn = document.getElementById('closePopupBtn');
const popupContainer = document.getElementById('videoPopupContainer');
const videobarControler = document.getElementById('video-bar-controller');

const togglePopupContainer = function() {
    popupContainer.classList.toggle('close');
}

openPopupBtn.addEventListener('click', ()=> {
    togglePopupContainer();
    videobarControler.style.width = "90%";
})
closePopupBtn.addEventListener('click', ()=> {
    togglePopupContainer();
    videobarControler.style.width = "60%";
})