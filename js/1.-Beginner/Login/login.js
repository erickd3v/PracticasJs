const inputEmail = document.querySelector('.inputEmail'),
    emailError = document.querySelector('.Emailerror'),

    inputPass = document.querySelector('.inputPass'),
    passError = document.querySelector('.Passerror'),

    logInBtn = document.querySelector('.logIn'),

    // Button to connect with signUp.html
    signUp = document.querySelector('span')

const dates = {
    name: 'admin',
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

    // Validando Contraseña
    inputPass.value !== ''
    ? inputPass.value === dates.pass
        ? passError.style.display = 'none'
        : passError.textContent = 'Contraseña incorrecta'
    : passError.textContent = 'Ingrese su contraseña';

    // Validación General
    if (inputEmail.value === dates.email && inputPass.value === dates.pass) window.location.href = 'https://www.google.com';
});

// Access with Google

var client;
var access_token;

function initClient() {
    client = google.accounts.oauth2.initTokenClient({
    client_id: '68186849727-apbp5270u9o4ji6uk5nsiv1pji0o5o32.apps.googleusercontent.com',
    scope: 'https://www.googleapis.com/auth/calendar.readonly \
            https://www.googleapis.com/auth/contacts.readonly ',
    callback: (tokenResponse) => {
        access_token = tokenResponse.access_token;
        window.location.href = 'https://www.google.com';
    },
    });
}

function getToken() {
    client.requestAccessToken();
}
// function revokeToken() {
//     google.accounts.oauth2.revoke(access_token, () => {console.log('access token revoked')});
// }


// Connect with signUp.html
signUp.addEventListener('click', redirect => {
    // Redirect to signUp.html
    window.location.href = 'https://erick150-ymf.github.io/PracticasJs/js/1.-Beginner/SignUp/signUp.html';
});