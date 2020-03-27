const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const { client_env } = require('./environment/environment.js');
// const {query, client} = require('./db/query_template');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');



// Create a new MongoClient
// const client = new MongoClient(client_env.url,{useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/ping', function (req, res) {
 query("00000000");
 return res.send('pong');
});

const options = {
    headers:{
        'Cache-Control' : 'no-cache'
    }
};
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'), options);
});

app.post('/form-submit-url', function (req, res) {
    MongoClient.connect(client_env.url,{useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        const db = client.db(client_env.dbName);
        const col = db.collection(client_env.colName);
        var query = { "id": req.body.id };
        col.find(query).toArray().then(function(result) {
            var dict = JSON.parse(JSON.stringify(result[0]));
            client.close();
            res.send(dict);
        });
      });
});

app.listen(process.env.PORT || 8080);