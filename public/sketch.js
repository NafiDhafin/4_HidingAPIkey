let lat, lon, pm, par;

const button = document.getElementById('checkIn')
button.addEventListener('click', async event => {
        getData().catch((error) => {
            console.log("something went wrong");
            console.error(error);
    });
})

async function getData(params) {
        const kota = document.getElementById('kota').value;

        const api_URL =`/weather/${kota}`
        const response = await fetch(api_URL)
        console.log("the data")

        const data = await response.json()
        lat = data.data.city.geo[0]
        lon = data.data.city.geo[1]
        console.log(data);

        document.getElementById('city').textContent = kota
        document.getElementById('temp').textContent = data.data.iaqi.t.v
        document.getElementById('pm').textContent = data.data.aqi
        document.getElementById('lat').textContent = lat.toFixed(2)
        document.getElementById('lon').textContent = lon.toFixed(2)
        document.getElementById('upd').textContent = data.data.time.s

            const db_data = {data, kota}
            const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(db_data)
        }
        const db_response = await fetch('/api',option)
        const db_json = await db_response.json();
}
