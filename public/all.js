let map = L.map("checkIn").setView([0, 0], 100);
//.L = leaflet library.........latitude,longitude,zoomLevel
let atribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
let tileURL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

let tiles = L.tileLayer(tileURL, { atribution });
tiles.addTo(map);

getData();
async function getData() {
  const response = await fetch("/api");
  const data = await response.json();

  for (item of data) {
    let lat = item.data.data.city.geo[0].toFixed(2);
    let lon = item.data.data.city.geo[1].toFixed(2);
    const marker = L.marker([lat, lon]).addTo(map);
    let txt = `negara/kota : ${item.kota.toUpperCase()}. garis lintang : ${lat} garis bujur : ${lon}. memiliki suhu rata-rata ${item.data.data.iaqi.t.v}°C, dengan tingkat pencemaran udara sebesar ${item.data.data.aqi} `;
    if (item.data.data.iaqi.pm10 == undefined) {
      txt += "dan kepadatan partikel tiap meter kubiknya [data tidak tersedia]. "
  } else {
      txt += `dan kepadatan partikel tiap meter kubiknya ${item.data.data.iaqi.pm10.v}.`
  }

    marker.bindPopup(txt);
  }

  console.log(data);
}
