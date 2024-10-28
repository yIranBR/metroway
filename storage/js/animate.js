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