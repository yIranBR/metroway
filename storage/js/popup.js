const openPopupBtn = document.getElementById('openPopupBtn');
const closePopupBtn = document.getElementById('closePopupBtn');
const popupContainer = document.getElementById('videoPopupContainer');

const togglePopupContainer = function() {
    popupContainer.classList.toggle('close');
}

openPopupBtn.addEventListener('click', ()=> {
    togglePopupContainer();
})
closePopupBtn.addEventListener('click', ()=> {
    togglePopupContainer();
})