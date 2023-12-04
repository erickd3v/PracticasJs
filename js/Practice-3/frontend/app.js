// const titleBook = document.getElementById('title');
// const textBook = document.getElementById('text');

// const book = [
//     {
//         title: '',
//         textContent: '',
//     }
// ]


// const btn = document.querySelector('button')
//     .addEventListener('click', (e) => {
//         e.preventDefault();
//         book[0].title = titleBook.value;
//         book[0].textContent = textBook.value;
//         console.log(book[0]);
//     });

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const text = document.getElementById('text').value;

        // Realizar acciones adicionales, como la validación del formulario

        // Enviar los datos al servidor
        fetch('/enviar-formulario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, text }),
        })
        .then(response => {
            if(!response.ok){
                throw new Error(`Error en la red: ${response.status}`) ;
            }
            return response.json();
        })
        .then(data => {
            console.log('Respuesta del servidor:', data);
        })
        .catch(error => {
            console.error('Error al enviar datos:', error);
        });
    });
});
