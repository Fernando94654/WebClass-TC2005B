const API_URL = "http://localhost:3000";

const loginForm = document.getElementById("loginForm");
if (loginForm) {
	const loginMessage = document.getElementById("loginMessage");

	loginForm.addEventListener("submit", async function (e) {
		e.preventDefault();

		const email = document.getElementById("email").value;
		const password = document.getElementById("password").value;

		if (!email || !password) {
			loginMessage.textContent = "Escribe email y password";
			loginMessage.style.color = "red";
			return;
		}

		try {
			const res = await fetch(`${API_URL}/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});

			const data = await res.json();

			if (!res.ok) {
				loginMessage.textContent = data.message || "Error en login";
				loginMessage.style.color = "red";
				return;
			}

			localStorage.setItem("webclassUser", JSON.stringify(data));
			loginMessage.textContent = "Login correcto";
			loginMessage.style.color = "green";
			window.location.href = "profile.html";
		} catch (error) {
			loginMessage.textContent = "No se pudo conectar con la API";
			loginMessage.style.color = "red";
		}
	});
}

const profileName = document.getElementById("profileName");
if (profileName) {
	const profileEmail = document.getElementById("profileEmail");
	const profileCreatedAt = document.getElementById("profileCreatedAt");
	const profileMessage = document.getElementById("profileMessage");
	const logoutBtn = document.getElementById("logoutBtn");

	const saved = localStorage.getItem("webclassUser");
	if (!saved) {
		window.location.href = "index.html";
	} else {
		const user = JSON.parse(saved);
		profileName.textContent = user.name;
		profileEmail.textContent = user.email;
		profileCreatedAt.textContent = user.created_at || "Sin fecha";

		fetch(`${API_URL}/users/${user.id}`)
			.then((res) => res.json())
			.then((freshUser) => {
				localStorage.setItem("webclassUser", JSON.stringify(freshUser));
				profileName.textContent = freshUser.name;
				profileEmail.textContent = freshUser.email;
				profileCreatedAt.textContent = freshUser.created_at || "Sin fecha";
				profileMessage.textContent = "Datos cargados desde API";
				profileMessage.style.color = "green";
			})
			.catch(() => {
				profileMessage.textContent = "No se pudo cargar el perfil desde API";
				profileMessage.style.color = "red";
			});
	}

	if (logoutBtn) {
		logoutBtn.addEventListener("click", function () {
			localStorage.removeItem("webclassUser");
			window.location.href = "index.html";
		});
	}
}

const buttons = document.querySelectorAll(".btn-toggle-desc");

buttons.forEach(function (button) {
	button.addEventListener("click", function () {
		const targetId = button.getAttribute("data-target");
		const text = document.getElementById(targetId);

		if (!text) {
			return;
		}

		if (text.style.display === "none") {
			text.style.display = "block";
		} else {
			text.style.display = "none";
		}
	});
});
