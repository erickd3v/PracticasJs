const inputEmail = document.querySelector('.inputEmail'),
    emailError = document.querySelector('.Emailerror'),

    inputPass = document.querySelector('.inputPass'),
    passError = document.querySelector('.Passerror'),
    logInBtn = document.querySelector('.logIn')


const dates = {
    email: 'admin@gmail.com',
    pass: '123456789'
}

logInBtn.addEventListener('click', information => {
    // Validando Datos

    inputEmail.value !== ''
    ? inputEmail.value === dates.email
        ? emailError.style.display = 'none'
        : emailError.textContent = 'Email incorrecto'
    : emailError.textContent = 'Ingrese su correo electronico';
    /*
    if (inputEmail.value !== '') {
        if (inputEmail.value === dates.email) {
            emailError.style.display = 'none';
        } else {
            emailError.textContent = 'Email incorrecto';
            return;
        }
    } else {
        emailError.textContent = 'Ingrese su correo electrónico';
        return;
    }
    */

    // Validando Contraseña
    inputPass.value !== ''
    ? inputPass.value === dates.pass
        ? passError.style.display = 'none'
        : passError.textContent = 'Contraseña incorrecta'
    : passError.textContent = 'Ingrese su contraseña';

    // Validación General
    if (inputEmail.value === dates.email && inputPass.value === dates.pass) window.location.href = 'https://www.google.com';
});