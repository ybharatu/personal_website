const express = require('express')
const app = express()

const http = require('http');
const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/assets'));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
	// res.send('Hello World!')
	res.render('index');
})

app.listen(port, function () {
	console.log('Example app listening on port 3000!')
})