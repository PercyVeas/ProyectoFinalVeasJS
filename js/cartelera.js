
document.addEventListener('DOMContentLoaded', () => {
    const botonesAgregar = document.querySelectorAll('.btn.btn-primary');

    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', agregarProducto);
    });

    function agregarProducto(event) {
        const card = event.target.closest('.card');
        const titulo = card.querySelector('.card-title').textContent;
        const precio = parseInt(card.dataset.precio); // Extraer el precio del atributo data-precio
        const productoExistente = document.querySelector(`.carrito .producto[data-titulo="${titulo}"]`);
    
        if (productoExistente) {
            aumentarCantidad(productoExistente);
        } else {
            const nuevoProducto = crearProducto(titulo, precio);
            agregarAlCarrito(nuevoProducto);
        }
        calcularTotalCompra(); // Calcular el total de la compra después de agregar un producto
    }
    

    function crearProducto(titulo, precio) {
        const producto = document.createElement('div');
        producto.classList.add('producto');
        producto.setAttribute('data-titulo', titulo);

        producto.innerHTML = `
            <h5>${titulo}</h5>
            <p>Precio: $${precio}</p>
            <p>Cantidad: 1</p>
            <button class="aumentar">+</button>
            <button class="eliminar">Eliminar</button>
        `;

        return producto;
    }

    function agregarAlCarrito(producto) {
        const carrito = document.querySelector('.carrito');
        carrito.insertBefore(producto, carrito.lastChild); // Insertar el producto antes del botón "Ir al pago"
    }

    function aumentarCantidad(producto) {
        const cantidadElemento = producto.querySelector('p:nth-child(3)');
        let cantidad = parseInt(cantidadElemento.textContent.match(/\d+/)[0]);
        cantidad++;
        cantidadElemento.textContent = `Cantidad: ${cantidad}`;
    }

    function calcularTotalCompra() {
        const productos = document.querySelectorAll('.carrito .producto');
        let total = 0;
        productos.forEach(producto => {
            const precioTexto = producto.querySelector('p:nth-child(2)').textContent;
            const precio = parseInt(precioTexto.match(/\d+/)[0]);
            total += precio;
        });
        document.getElementById('totalCompra').textContent = `Total: $${total}`;
    }

    document.querySelector('.carrito').addEventListener('click', event => {
        const boton = event.target;
        if (boton.classList.contains('aumentar')) {
            aumentarCantidad(boton.closest('.producto'));
            calcularTotalCompra(); // Calcular el total de la compra después de aumentar la cantidad
        } else if (boton.classList.contains('eliminar')) {
            boton.closest('.producto').remove();
            calcularTotalCompra(); // Calcular el total de la compra después de eliminar un producto
        } else if (boton.id === 'irAlPago') {
            // Aquí puedes redirigir al usuario a la página de pago
            alert('Redirigiendo al pago...'); // Esto es solo un ejemplo, puedes reemplazarlo con tu lógica de redirección
        }
    });
});

