const express = require('express')
const app = express()

const http = require('http');
const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/assets'));
app.set('view engine', 'ejs')

// app.get('/', function (req, res) {
// 	// res.send('Hello World!')
// 	res.render('index');
// })

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.render('index')
  // res.setHeader('Content-Type', 'text/html');
  // res.end('<h1>Hello World</h1>');
});

server.listen(port,() => {
  console.log(`Server running at port `+port);
});

// app.listen(3000, function () {
// 	console.log('Example app listening on port 3000!')
// })