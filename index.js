const express = require('express')
const Datastore = require('nedb')
const axios = require('axios').default;

require("dotenv").config()
console.log(process.env);

const app = express();
app.listen(3000, () => {console.log('listening at 3000');})
app.use(express.static('public'));
app.use(express.json({limit : '1mb'}))

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api', (request, response) => {
    database.find({}, (error, data) =>{
        if (error) {
            response.end();
            return;
        }
        response.json(data);
    })
})

app.post('/api', (request, response) => {
    console.log('i got a request');
    console.log(request.body);
    const data = request.body;
    const timestamp = Date.now();

    data.timestamp = timestamp
    database.insert(data);
    console.log(database);

    // response.json({
    //     status : 'success',
    //     timestamp: timestamp,
    //     latitude : data.lat,
    //     longitude : data.lon
    // })
})
app.get('/weather/:kota', async (request, response) => {
    console.log("axios1");
    console.log(request.params);
    const kota = request.params.kota;
    console.log(kota);
  
    //console.log(kota);

    const api_key = process.env.API_KEY;
    const api_URL =`https://api.waqi.info/feed/${kota}/?token=${api_key}`
    const fetch_response = await axios.get(api_URL)
    //console.log(fetch_response.data);
    response.json(fetch_response.data);
    //const json = await fetch_response.json()
});