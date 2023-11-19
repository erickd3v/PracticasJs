class Product {
    constructor(name, price, year){
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

class UI {
    addProduct(product) {
        const plist = document.getElementById('product-list');
        const element = document.createElement('div');

        // Agregamos la clase product-card.
        element.classList.add('product');

        // Agremamos en el div los nuevos elementos de manera dinamica.
        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Product Name</strong>: ${product.name}
                    <strong>Product Price</strong>: ${product.price}
                    <strong>Product Year</strong>: ${product.year}
                    <a href="#" class="btn btn-danger" name="delete">X</a>
                </div>
            </div>
        `;
        plist.appendChild(element);
    }

    deleteProduct(element) {
        const productDiv = element.closest('.product');
        
        if (element.name === 'delete') {
            productDiv.remove();
            this.showMessage('Product deleted successfully', 'info');
        }
    }

    showMessage(message, cssClass) {
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-2`;
        div.appendChild(document.createTextNode(message));

        // Showing in DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#App');

        container.insertBefore(div, app);
        setTimeout(()=> {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    resetForm() {
        document.getElementById('product-form').reset();
    }
}

// DOM Events

document.getElementById('product-form')
    .addEventListener('submit', (e) => {
        const name = document.getElementById('name').value;
        const price = document.getElementById('price').value;
        const year = document.getElementById('year').value;
        
        const product = new Product(name, price, year);

        const ui = new UI();
        if(name === '' || price === '' || year === '') return ui.showMessage('Complete fields please', 'danger');
        ui.addProduct(product);
        ui.resetForm();
        ui.showMessage('Product added succesfully', 'success');

        e.preventDefault();
    });

document.getElementById('product-list')
    .addEventListener('click', (e) => {
        const ui = new UI();
        ui.deleteProduct(e.target);
    });