async function windowActions() {
  const request = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
  const resultData = await request.json();
  const ACCESS_TOKEN = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
  const mymap = L.map('mapid').setView([38.9897, -76.9378], 12);
  let itemCounter = 0;

  L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${ACCESS_TOKEN}`, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
  }).addTo(mymap);

  function findMatches (wordToMatch, resultData) {
    return resultData.filter((place) => {
      const regex = new RegExp(wordToMatch, 'gi');
      return place.zip.match(regex);
    });
  }

  function displayMatches(event) {
    const matchArray = findMatches(event.target.value, resultData);
    const html = matchArray.map((place) => {
      if (!event.target.value || itemCounter > 4) {
        document.querySelector('.suggestions').innerHTML = '';
      } else {
        itemCounter += 1;
        console.log(itemCounter);
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
    itemCounter = 0;
  }

  const searchInput = document.querySelector('.search');
  const suggestions = document.querySelector('.suggestions');

  searchInput.addEventListener('change', (evt) => { displayMatches(evt); });
  searchInput.addEventListener('keyup', (evt) => { displayMatches(evt); });
}

window.onload = windowActions;