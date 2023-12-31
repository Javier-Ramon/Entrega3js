
const destinationsContainer = document.getElementById('destinations');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const clearCartButton = document.getElementById('clear-cart');
const destinations = []; 


if (localStorage.getItem('destination')) {
    destinations.push(...JSON.parse(localStorage.getItem('destination')));
} else {

    fetch('../destinos.json')
        .then(response => response.json())
        .then(data => {
            destinations.push(...data);

            localStorage.setItem('destinations', JSON.stringify(data));
            displayDestinations();
        });
}

function displayDestinations() {
    destinationsContainer.innerHTML = '';
    destinations.forEach(destination => {
        const destinoDiv = document.createElement('div');
        destinoDiv.classList.add('destino');

        const imagen = document.createElement('img');
        imagen.src = destination.imagen;
        destinoDiv.appendChild(imagen);

        const nombre = document.createElement('h3');
        nombre.textContent = destination.nombre;
        destinoDiv.appendChild(nombre);

        const descripcion = document.createElement('p'); 
        descripcion.textContent = destination.descripcion; 
        destinoDiv.appendChild(descripcion);

        const precio = document.createElement('p');
        precio.textContent = `$${destination.precio}`;
        destinoDiv.appendChild(precio);

        const boton = document.createElement('button');
        boton.textContent = 'Agregar al Carrito';
        boton.addEventListener('click', () => addToCart(destination));
        destinoDiv.appendChild(boton);

        destinationsContainer.appendChild(destinoDiv);
    });
}


const cart = {
    items: [],
    total: 0
};

function addToCart(destination) {
    cart.items.push(destination);
    cart.total += destination.precio;
    updateCart();

    localStorage.setItem('cart', JSON.stringify(cart));

    Swal.fire({
        icon: 'success',
         title: '¡Producto Agregado!',
        text: `Se ha agregado "${destination.nombre}" al carrito`,
         confirmButtonText: 'Cerrar'
     });

    function Comprar() {
        Swal.fire({
            icon: 'success',
            title: '¡Compra Exitosa!',
            text: `Tu viaje a "${destination.nombre}"  han sido comprado con éxito `,
            confirmButtonText: 'Cerrar',
            showConfirmButton: true,
            timer: 200000 
        });
        cart.items = [];
        cart.total = 0;
        updateCart();
    }

  
    const ButtonComprar = document.getElementById('Comprar');
    ButtonComprar.addEventListener('click', Comprar);

}

function updateCart() {
    cartItems.innerHTML = '';
    cart.items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.nombre;
        cartItems.appendChild(li);
    });
    cartTotal.textContent = cart.total;
    localStorage.setItem('cart', JSON.stringify(cart));
}

clearCartButton.addEventListener('click', () => {
    cart.items = [];
    cart.total = 0;
    updateCart();

    localStorage.removeItem('cart')
   
    Swal.fire({
        icon: 'success',
        title: 'Carrito Vacío',
        text: 'El carrito de compras ha sido vaciado.' ,
        confirmButtonText: 'Ok'
    });
});

if (localStorage.getItem('cart')){
    cart = JSON.parse(localStorage.getItem('cart'));
    updateCart();
}