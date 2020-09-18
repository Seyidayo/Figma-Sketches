function handleMenuToggle() {
    icon.classList.toggle("show");
    nav.classList.toggle("show");
}
var button = document.querySelector(".menu");
var nav = document.querySelector(".nav__list");
var icon = button.querySelector(".icon");
button.addEventListener("click", handleMenuToggle);
