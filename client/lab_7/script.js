const mymap = L.map('mapid').setView([51.505, -0.09], 13);

async function windowActions() {
  const request = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
  const resultData = await request.json();

  function findMatches (wordToMatch, resultData) {
    return resultData.filter((place) => {
      const regex = new RegExp(wordToMatch, 'gi');
      return place.zip.match(regex);
    });
  }

  function displayMatches(event) {
    const matchArray = findMatches(event.target.value, resultData);
    const html = matchArray.map((place) => {
      if (!event.target.value) {
        document.querySelector('.suggestions').innerHTML = '';
      } else {
        return `
                <li>
                    <span class = "name">${place.name}<br></span>
                    <span class = "name">${place.category}<br></span>
                    <span class = "name">${place.address_line_1}<br></span>
                    <span class = "name">${place.city}<br></span>
                    <span class = "name">${place.zip}<br></span>
                    <br>
                </li>
                `;
      }
    }).join('');
    suggestions.innerHTML = html;
  }

  const searchInput = document.querySelector('.search');
  const suggestions = document.querySelector('.suggestions');

  searchInput.addEventListener('change', (evt) => { displayMatches(evt); });
  searchInput.addEventListener('keyup', (evt) => { displayMatches(evt); });
}

window.onload = windowActions;