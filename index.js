const express = require('express');
const app = express();
const port = 3000;
const request = require("request");
const path = require("path")
var mcache = require('memory-cache');
var PropertiesReader = require("properties-reader");

var properties = PropertiesReader("./resources/api.properties")

var stationsDetailsUrl = properties.get("api") + "/station_{id}.json";
var stationsUrl = properties.get("api") + "/stationoverview.json";
console.log(stationsDetailsUrl);
console.log(stationsUrl);

var cache = (duration) => {
    return (req, res, next) => {
        let key = '__express__' + req.originalUrl || req.url
        console.log(key);
        let cachedBody = mcache.get(key)
        if (cachedBody) {
            res.send(cachedBody)
            return
        } else {
            res.sendResponse = res.send
            res.send = (body) => {
                console.log('cached');
                mcache.put(key, body, duration * 1000 * 60);
                res.sendResponse(body);
            }
            next()
        }
    }
}

app.use(express.static(path.join(__dirname, 'frontend')));

app.get('/api/station/:stationId', cache(60), (req, res) => {
    request(stationsDetailsUrl.replace("{id}", req.params.stationId), 
            function(error, response, body) {
        res.send(body);
    });
});

app.get("/api/station", cache(60), (req, res) => {
    request(stationsUrl, function(error, response, body) {
        res.send(body);
    });
});

app.get("/api/img", cache(60), (req, res) => {
    console.log("IMG-", req.query.key);
    res.header("Content-Type", "image/jpeg");
    request(req.query.key, function(error, response, body) {
        res.send(body);
    });
});

app.get("/api/cache/clear", (req, res) => {
    mcache.clear();
    console.log('cache cleared');
});



app.listen(port, () => console.log(`Snow app listening on port ${port}!`))