const API_KEY = 'd482b52d';

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const movieList = document.getElementById('movie-list');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query.length > 2) {
    fetchMovies(query);
  }
});

searchInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    searchBtn.click();
  }
});

async function fetchMovies(query) {
  const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.Response === 'True') {
    displayMovies(data.Search);
  } else {
    movieList.innerHTML = '<p>No results found.</p>';
  }
}

function displayMovies(movies) {
  movieList.innerHTML = '';
  movies.forEach(movie => {
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
      <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300'}" alt="${movie.Title}">
      <h3>${movie.Title}</h3>
      <p>(${movie.Year})</p>
    `;
    movieList.appendChild(movieEl);
  });
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');

  if (document.body.classList.contains('light-mode')) {
    themeIcon.innerHTML = '<path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zM1 13h3v-2H1v2zm10-9h-2v3h2V4zm7.66 1.46l-1.41-1.41-1.8 1.79 1.42 1.42 1.79-1.8zM17 11v2h3v-2h-3zm-5 4a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm5.24 2.16l1.8 1.79 1.41-1.41-1.79-1.8-1.42 1.42zM13 20h-2v3h2v-3zm-7.66-1.46l1.41 1.41 1.8-1.79-1.42-1.42-1.79 1.8z"/>';
  } else {
    themeIcon.innerHTML = '<path d="M12 3a9 9 0 1 0 9 9c0-.34-.02-.67-.06-1A7 7 0 0 1 12 3z"/>';
  }
});
