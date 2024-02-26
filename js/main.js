
// Clave de API de TMDB (reemplaza 'TU_API_KEY' con tu propia clave)
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
    // Iterar sobre las películas y mostrar las títulos y pósters en la página
    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('card'); // Agregar clase 'card' a la tarjeta
        movieElement.innerHTML = `
        <h2>${movie.title}</h2>
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" height:300px; width:300px;>`;
        moviesContainer.appendChild(movieElement);
    });
})
    .catch(error => {
    // Manejar cualquier error que ocurra durante la solicitud
    console.error('Error al obtener películas populares:', error);
});





