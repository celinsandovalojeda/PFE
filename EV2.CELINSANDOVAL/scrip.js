document.getElementById("formulario").addEventListener("submit", function (e) {
  e.preventDefault();
  if (validarFormulario()) {
    alert("Formulario enviado correctamente.");
    this.reset();
  }
});

function resetForm() {
  document.getElementById("formulario").reset();
  limpiarError();
}

function validarFormulario() {
  limpiarError();
  let valido = true;

  const nombreUsuario = document.getElementById("nombre");
  if (nombreUsuario.value.trim() === "") {
    mostrarError(nombreUsuario, "El nombre es requerido.");
    valido = false;
  }

  const rutUsuario = document.getElementById("rut");
  if (!validarRut(rutUsuario.value)) {
    mostrarError(rutUsuario, "RUT inválido.");
    valido = false;
  }

  const fecha = document.getElementById("fechaNacimiento");
  if (fecha.value && !/^\d{2}\/\d{2}\/\d{4}$/.test(fecha.value)) {
    mostrarError(fecha, "Formato de fecha inválido. Use dd/MM/yyyy.");
    valido = false;
  }

  const curriculumVitae = document.getElementById("cv");
  if (curriculumVitae.value && !/\.(pdf|docx)$/i.test(curriculumVitae.value)) {
    mostrarError(curriculumVitae, "El archivo debe ser PDF o DOCX.");
    valido = false;
  }

  const correoElectronico = document.getElementById("email");
  if (!/^[^@]+@[^@]+\.[a-z]{2,}$/i.test(correoElectronico.value)) {
    mostrarError(correoElectronico, "Email inválido.");
    valido = false;
  }

  const password = document.getElementById("password");
  const validarPassword = document.getElementById("confirmPassword");
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,12}$/;
  if (!passwordRegex.test(password.value)) {
    mostrarError(password, "La contraseña debe tener mayúscula, minúscula, número y 6-12 caracteres.");
    valido = false;
  }
  if (password.value !== validarPassword.value) {
    mostrarError(validarPassword, "Las contraseñas no coinciden.");
    valido = false;
  }

  return valido;
}

function mostrarError(campo, mensaje) {
  campo.classList.add("error");
  const error = document.createElement("div");
  error.className = "error-message";
  error.textContent = mensaje;
  campo.insertAdjacentElement("afterend", error);
}

function limpiarError() {
  const errores = document.querySelectorAll(".error-message");
  errores.forEach(e => e.remove());
  const campos = document.querySelectorAll(".error");
  campos.forEach(c => c.classList.remove("error"));
}

function validarRut(rut) {
  rut = rut.replace(/\./g, "").replace("-", "");
  if (rut.length < 8) return false;

  const número = rut.slice(0, -1);
  const caracter = rut.slice(-1).toUpperCase();

  let suma = 0;
  let multiplo = 2;

  for (let i = número.length - 1; i >= 0; i--) {
    suma += parseInt(número.charAt(i)) * multiplo;
    multiplo = multiplo < 7 ? multiplo + 1 : 2;
  }

  const caracterEsperado = 11 - (suma % 11);
  let caracterCalc = caracterEsperado === 11 ? "0" : caracterEsperado === 10 ? "K" : caracterEsperado.toString();

  return caracter === caracterCalc;
}
