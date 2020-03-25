const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});
const options = {
	headers:{
		'Cache-Control' : 'no-cache'
	}
};
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'), options, (err) => {
  	if (err) {
  		next(err);
  	} 
  });
});

app.listen(process.env.PORT || 8080);