const SEARCH = document.getElementById('search-btn');

SEARCH.addEventListener('click', () => {
  let container = document.getElementById('container'),
    types = "",
    pokemonName = document.getElementById('searchbar').value; // Pikachu's ID
  const APIURL = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
  fetch(APIURL)
    .then(response => response.json())
    .then(data => {
      let pokemonImg = Object.values(data.sprites)
      for (let i = 0; i < data.types.length; i++) {
        types += data.types[i].type.name + " "
      }
      container.innerHTML = `
        <div class="img-container">
          <img class="arrow-btn left" src="/node_modules/iconoir/icons/arrow-left.svg" />
          <img class="img" src="${pokemonImg[0]}" />
          <img class="arrow-btn right" src="/node_modules/iconoir/icons/arrow-right.svg" />
        </div>
        <p>#${data.id}</p>
        <p>${types}</p>
        <h1 id="name">${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h1>
      `

      let ARROW_BUTTONS = document.querySelectorAll('.arrow-btn');
          ARROW_BUTTONS = Array.from(ARROW_BUTTONS)
      console.log(typeof ARROW_BUTTONS)
      for (let i = 0; i < ARROW_BUTTONS.length; i++) {
        ARROW_BUTTONS[i].addEventListener('click', (btn) => {
          if (btn.target.classList.contains('left')) {
            pokemonImg.splice(0, 0, pokemonImg.pop());
          } else {
            pokemonImg.splice(pokemonImg.length - 1, 1, pokemonImg.shift());
          }
          container.querySelector('.img').src = pokemonImg[0];
        });
      }
    })
  .catch(error => console.error(error));
})
