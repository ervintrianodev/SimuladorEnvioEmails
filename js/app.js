//botones
const btnEnviar = document.getElementById("enviar");
const btnReset = document.getElementById("resetBtn");

//campos de textos
const email = document.getElementById("email");
const asunto = document.getElementById("asunto");
const mensaje = document.getElementById("mensaje");

const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
document.addEventListener("DOMContentLoaded", function () {
    email.addEventListener("keyup", validarEmail);
    email.addEventListener('blur', validarEmail);

    asunto.addEventListener('blur', validarCampos);
    asunto.addEventListener('keyup', validarCampos);

    mensaje.addEventListener('blur', validarCampos);
    mensaje.addEventListener('keyup', validarCampos);

    btnReset.addEventListener('click', () => {
        email.classList.remove('validation-success', 'validation-error');
        asunto.classList.remove('validation-success', 'validation-error');
        mensaje.classList.remove('validation-success', 'validation-error');
    });

    document.forms[0].addEventListener('submit', sendEmail);

});

function validarEmail(e) {
    if (e.target.value.length > 0) {
        //Si la validacion del emal va bien
        if (regularExpression.test(e.target.value)) {
            if (e.target.parentElement.querySelector("p.error") != null) {
                removeErrorMessage(e);
            }
            email.classList.remove('validation-error')
            email.classList.add('validation-success');
        } else {
            if (e.target.parentElement.querySelector('p.error') == null) {
                createErrorMessage(e, 'Ingrese un email válido');

            }
            email.classList.remove('valition-succes');
            email.classList.add('validation-error');
        }
        habilitarBotonEnviar(e);
    } else {
        if (e.target.parentElement.querySelector('p.error') == null) {

            createErrorMessage(e);
        }
    }
}

function validarCampos(e) {
    //Si la validacion  está bien
    if (e.target.value.length > 0) {
        e.target.classList.remove('validation-error');
        e.target.classList.add('validation-success');
        //removemos los párrafos del error si la validacion va bien
        if (e.target.parentElement.querySelector('p.error') != null) {
            removeErrorMessage(e);
        }

    } else {
        //Si la validacion va mal (chequeamos que no existan lo párrafos con mensajes de error)
        if (e.target.parentElement.querySelector('p.error') == null) {
            createErrorMessage(e);

        }


    }
    habilitarBotonEnviar(e);

}

function habilitarBotonEnviar(e) {
    if (email.classList.contains('validation-success') &&
        asunto.classList.contains('validation-success') &&
        mensaje.classList.contains('validation-success')
    ) {
        console.log('La validacion tuvo éxito')
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
        if (btnEnviar.hasAttribute('disabled')) {
            btnEnviar.removeAttribute('disabled');
        }
    }
    if (email.classList.contains('validation-error') ||
        asunto.classList.contains('validation-error') ||
        mensaje.classList.contains('validation-error')) {
        if (!btnEnviar.hasAttribute('disabled')) {
            console.log("La validaxción tiene errorees todavia")
            btnEnviar.classList.add('cursor-not-allow', 'opacity-50');
            btnEnviar.disabled = true;
            btnEnviar.style.cursor = 'not-allowed';
        }
    }
}

function createErrorMessage(e, mensaje = "Este campo no puede quedar vacío") {
    const parrafo = document.createElement('p');
    parrafo.textContent = mensaje;
    parrafo.style.color = "#FF0000";
    parrafo.style.textAlign = "center";
    parrafo.style.borderColor = "#FF0000";
    parrafo.style.margin = "10px";
    parrafo.classList.add('error');
    e.target.parentElement.appendChild(parrafo);
    //verificamos si ya contiene las clases
    e.target.classList.remove('validation-success');
    e.target.classList.add('validation-error');
}

function createSuccessMessage() {
    const successParrafo = document.createElement('p');
    successParrafo.textContent = 'E-mail enviado'
    successParrafo.style.backgroundColor = '#009ba0'
    successParrafo.style.color='#FFF'
    successParrafo.classList.add('validacion-succes');
    successParrafo.style.margin = '20px 5px 5px 5px';
    successParrafo.style.padding = '10px';
    successParrafo.style.textAlign = 'center';
    successParrafo.style.border='1px solid #009ba0';
    document.forms[0].appendChild(successParrafo)
}

function removeErrorMessage(e) {
    const parrafo = e.target.parentElement.querySelector('p.error');
    e.target.parentElement.removeChild(parrafo);
}

function sendEmail(e) {
    e.preventDefault();
    const spinner = document.getElementById("spinner");
    spinner.style.display = "flex";
    setTimeout(() => {
        spinner.style.display = 'none';
        createSuccessMessage();
    }, 3000);
}