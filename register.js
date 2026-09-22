const registerForm = document.getElementById("registerForm");
const registerMessage = document.getElementById("registerMessage");

document.querySelectorAll(".show-password").forEach((button) => {
  button.addEventListener("click", () => {
    const inputId = button.dataset.input;
    const passwordInput = document.getElementById(inputId);

    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      button.textContent = "🙈";
    } else {
      passwordInput.type = "password";
      button.textContent = "👁";
    }
  });
});

registerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword =
    document.getElementById("confirmPassword").value;
  const terms = document.getElementById("terms").checked;

  registerMessage.className = "form-message";
  registerMessage.textContent = "";

  if (!fullName || !email || !phone || !password) {
    showMessage("Ka cika dukkan bayanan da ake buƙata.", "error");
    return;
  }

  if (password.length < 6) {
    showMessage(
      "Password dole ya ƙunshi aƙalla haruffa 6.",
      "error"
    );
    return;
  }

  if (password !== confirmPassword) {
    showMessage("Password ɗin biyu ba su yi daidai ba.", "error");
    return;
  }

  if (!terms) {
    showMessage("Sai ka amince da dokokin amfani.", "error");
    return;
  }

  showMessage(
    "Bayanan sun yi daidai. Za mu haɗa Firebase domin ƙirƙirar account.",
    "success"
  );
});

function showMessage(message, type) {
  registerMessage.textContent = message;
  registerMessage.className = `form-message ${type}`;

  registerMessage.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}