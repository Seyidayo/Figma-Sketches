function handleMenuToggle(): void {
  icon.classList.toggle("show");
  nav.classList.toggle("show");
}

const button = document.querySelector(".menu") as HTMLButtonElement;
const nav = document.querySelector(".nav__list");
const icon = button.querySelector(".icon");
button.addEventListener("click", handleMenuToggle);
