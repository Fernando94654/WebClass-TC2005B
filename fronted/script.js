const loginForm = document.getElementById("loginForm");

if (loginForm) {
	const loginMessage = document.getElementById("loginMessage");

	loginForm.addEventListener("submit", function (event) {
		event.preventDefault();

		const email = document.getElementById("email").value;
		const password = document.getElementById("password").value;

		if (email === "fernando@webclass.com" && password === "1234") {
			loginMessage.style.color = "green";
			loginMessage.textContent = "Login correcto. Redirigiendo...";
			window.location.href = "profile.html";
		} else {
			loginMessage.style.color = "red";
			loginMessage.textContent = "Credenciales incorrectas";
		}
	});
}

const buttons = document.querySelectorAll(".btn-toggle-desc");

buttons.forEach(function (button) {
	button.addEventListener("click", function () {
		const targetId = button.getAttribute("data-target");
		const text = document.getElementById(targetId);

		if (text.style.display === "none") {
			text.style.display = "block";
		} else {
			text.style.display = "none";
		}
	});
});
