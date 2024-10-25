const navbar = document.getElementById("aside-navbar");
const links = document.querySelectorAll('#aside-navbar a');
let opened = false;

//Abre e fecha menu
const toggleNavbar = function() {
    navbar.classList.toggle('open');
    opened = (opened ? false : true);
}

//Faz a verificação e vai para a seção
const goToSection = function(opened, link) {
    if (opened) {
        links.forEach(i => {
            i.classList.remove("active");
        })
        link.classList.add("active");
        window.location.href = link.getAttribute('data-href');
    }
}


navbar.addEventListener("click", ()=> {
    toggleNavbar();
})

links.forEach((link, i) => {
    link.addEventListener("click", ()=> {
        goToSection(opened, link);
    })
})