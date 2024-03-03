
/* CODIGO DE INDEX */

// Clave de API de TMDB
const apiKey = 'b20102a953a25b6f42cd5e5660dc717f';

// URL base de la API de TMDB
const baseUrl = 'https://api.themoviedb.org/3';

// Endpoint para obtener películas populares
const popularMoviesEndpoint = '/movie/popular';

// Construir la URL completa con la clave de la API
const url = `${baseUrl}${popularMoviesEndpoint}?api_key=${apiKey}`;

// Obtener referencia al contenedor de películas en el HTML
const moviesContainer = document.getElementById('movies');

// Realizar la solicitud a la API de TMDB
fetch(url)
    .then(response => {
        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error('La solicitud no fue exitosa');
        }
        // Convertir la respuesta a formato JSON
        return response.json();
    })
    .then(data => {
        // Manejar los datos obtenidos de la API
        const movies = data.results;
        // Iterar sobre las películas y mostrar los títulos y pósters en la página
        movies.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.classList.add('card'); // Agregar clase 'card' a la tarjeta
            movieElement.innerHTML = `
                <h2>${movie.title}</h2>
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" height="300" width="300">
            `;
            moviesContainer.appendChild(movieElement);
        });
    })
    .catch(error => {
        // Manejar cualquier error que ocurra durante la solicitud
        console.error('Error al obtener películas populares:', error);
    });



/* CODIGO CARTELERA */

// Función para obtener el carrito desde el localStorage
function obtenerCarrito() {
    const carrito = localStorage.getItem('carrito');
    return carrito ? JSON.parse(carrito) : [];
}

// Función para guardar el carrito en el localStorage
function guardarCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para agregar un producto al carrito
function agregarAlCarrito(producto) {
    const carrito = obtenerCarrito();
    carrito.push(producto);
    guardarCarrito(carrito);
}

// Función para mostrar el carrito en la consola (solo para propósitos de prueba)
function mostrarCarrito() {
    const carrito = obtenerCarrito();
    console.log(carrito);
}

document.addEventListener('DOMContentLoaded', () => {
    // Agregar evento de clic a los botones "Agregar al carrito"
    const botonesAgregar = document.querySelectorAll('.btn.btn-primary');
    botonesAgregar.forEach((boton) => {
        boton.addEventListener('click', (event) => {
            // Obtener el título y precio del producto
            const card = event.target.closest('.card');
            const titulo = card.querySelector('.card-title').textContent;
            const precio = card.querySelector('.card-text').textContent.replace('Disfruta de', '').replace(' por solo', '').replace('$', '').trim();
            
            // Crear un objeto producto
            const producto = {
                titulo: titulo,
                precio: parseFloat(precio)
            };

            // Agregar el producto al carrito
            agregarAlCarrito(producto);
        });
    });

    // Mostrar el carrito en la consola (solo para propósitos de prueba)
    mostrarCarrito();
});




document.addEventListener('DOMContentLoaded', () => {
    // Recuperar el carrito del almacenamiento local al cargar la página
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        const carrito = JSON.parse(carritoGuardado);
        carrito.forEach(item => {
            const nuevoProducto = crearProducto(item.titulo, item.precio);
            const cantidadElemento = nuevoProducto.querySelector('p:nth-child(3)');
            cantidadElemento.textContent = `Cantidad: ${item.cantidad}`;
            agregarAlCarrito(nuevoProducto);
        });
        calcularTotalCompra();
    }
    // Resto del código...
});

