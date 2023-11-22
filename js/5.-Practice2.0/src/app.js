document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');

    form.addEventListener('submit', () => {
        const title = document.getElementById('title').value;
        const text = document.getElementById('text1').value;
        const texto2 = document.getElementById('beta').value;

        // Realizar acciones adicionales, como la validación del formulario

        // Enviar los datos al servidor
        fetch('/enviar-formulario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, text, texto2 }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta del servidor:', data);
        })
        .catch(error => {
            console.error('Error al enviar datos:', error);
        });
    });
});
