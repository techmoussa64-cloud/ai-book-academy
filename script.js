const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");

menuButton.addEventListener("click", () => {
  navMenu.classList.toggle("active");

  menuButton.textContent =
    navMenu.classList.contains("active") ? "✕" : "☰";
});

document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    menuButton.textContent = "☰";
  });
});

const whatsappNumber = "+218914658516";

const whatsappMessage =
  "Assalamu alaikum, ina son ƙarin bayani game da AI Book Academy.";

const whatsappLink =
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

document.getElementById("whatsappButton").href = whatsappLink;
document.getElementById("footerWhatsapp").href = whatsappLink;

document.getElementById("currentYear").textContent =
  new Date().getFullYear();