document.addEventListener('DOMContentLoaded', () => {
    const botonesAgregar = document.querySelectorAll('.btn.btn-primary');

    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', agregarProducto);
    });

    // Obtener el carrito del localStorage al cargar la página
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    function agregarProducto(event) {
        const card = event.target.closest('.card');
        const titulo = card.querySelector('.card-title').textContent;
        const precio = parseInt(card.dataset.precio);
        const productoExistente = carrito.find(producto => producto.titulo === titulo);
        
        if (productoExistente) {
            aumentarCantidad(productoExistente);
        } else {
            const nuevoProducto = { titulo, precio, cantidad: 1 };
            carrito.push(nuevoProducto);
            guardarCarritoEnLocalStorage();
            const productoDOM = crearProducto(nuevoProducto);
            agregarAlCarrito(productoDOM);
        }
        calcularTotalCompra();
    }
    
    function guardarCarritoEnLocalStorage() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }
    
    function crearProducto(producto) {
        const productoDOM = document.createElement('div');
        productoDOM.classList.add('producto');
        productoDOM.setAttribute('data-titulo', producto.titulo);

        productoDOM.innerHTML = `
            <h5>${producto.titulo}</h5>
            <p>Precio: $${producto.precio}</p>
            <p>Cantidad: ${producto.cantidad}</p>
            <button class="aumentar">+</button>
            <button class="disminuir">-</button>
            <button class="eliminar">Eliminar</button>
        `;

        return productoDOM;
    }

    function agregarAlCarrito(producto) {
        const carritoDOM = document.querySelector('.carrito');
        carritoDOM.appendChild(producto); 
    }

    function aumentarCantidad(producto) {
        producto.cantidad++;
        guardarCarritoEnLocalStorage();
        const productoDOM = document.querySelector(`.carrito .producto[data-titulo="${producto.titulo}"]`);
        productoDOM.querySelector('p:nth-child(3)').textContent = `Cantidad: ${producto.cantidad}`;
    }

    function disminuirCantidad(producto) {
        if (producto.cantidad > 1) {
            producto.cantidad--;
            guardarCarritoEnLocalStorage();
            const productoDOM = document.querySelector(`.carrito .producto[data-titulo="${producto.titulo}"]`);
            productoDOM.querySelector('p:nth-child(3)').textContent = `Cantidad: ${producto.cantidad}`;
        }
    }

    function calcularTotalCompra() {
        let total = 0;
        carrito.forEach(producto => {
            total += producto.precio * producto.cantidad;
        });
        document.getElementById('totalCompra').textContent = `Total: $${total}`;
    }

    document.querySelector('.carrito').addEventListener('click', event => {
        const boton = event.target;
        const titulo = boton.closest('.producto').getAttribute('data-titulo');
        const producto = carrito.find(producto => producto.titulo === titulo);
        if (boton.classList.contains('aumentar')) {
            aumentarCantidad(producto);
            calcularTotalCompra(); 
        } else if (boton.classList.contains('disminuir')) {
            disminuirCantidad(producto);
            calcularTotalCompra(); 
        } else if (boton.classList.contains('eliminar')) {
            const index = carrito.findIndex(producto => producto.titulo === titulo);
            carrito.splice(index, 1);
            guardarCarritoEnLocalStorage();
            boton.closest('.producto').remove();
            calcularTotalCompra(); 
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Producto eliminado",
                showConfirmButton: false,
                timer: 1500
            });
        } else if (boton.id === 'irAlPago') { 
            
        }
    });

    // Al cargar la página, agregar los productos del carrito al DOM
    carrito.forEach(producto => {
        const productoDOM = crearProducto(producto);
        agregarAlCarrito(productoDOM);
    });

    calcularTotalCompra();
});
