const navbar = document.getElementById("aside-navbar");
const links = document.querySelectorAll('#aside-navbar a');
const arraySections = document.querySelectorAll('#sections-list section');

let opened = false;

const toggleNavbar = function() {
    navbar.classList.toggle('open');
    opened = (opened ? false : true);
}

const goToSection = function(opened, link) {
    if (opened) {
        links.forEach(function(i) {
            i.classList.remove("active");
            window.location.href = link.getAttribute('data-href');
        })
        link.classList.add("active");
    }
}

navbar.addEventListener("click", function() {
    toggleNavbar();
})

links.forEach((link) => {
    link.addEventListener("click", function() {
        goToSection(opened, link);
    })
})