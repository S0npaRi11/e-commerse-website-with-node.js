const searchBar = document.querySelector('#searchBar');

const searchButton = document.querySelector('#searchButton');

searchButton.addEventListener('click', () => {
    searchBar.classList.toggle('searchToggle');
});


