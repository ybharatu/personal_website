const express = require('express')
const app = express()

const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/assets'));
app.set('view engine', 'ejs')

app.get('/.well-known/acme-challenge/Tu-OKRCGPX9YlzcfKKQRhFMr68hJn08GNgO12uq-7_o', function(req, res) {
  res.send('Tu-OKRCGPX9YlzcfKKQRhFMr68hJn08GNgO12uq-7_o.96BF3Cazuj4DF3MFKt4XU2VuOuOzqP0P0rX6JWtoEYg')
})

app.get('/', function (req, res) {
	// res.send('Hello World!')
	res.render('index');
})
app.get('/purdue_page', function (req, res) {
	// res.send('Hello World!')
	res.render('purdue_page');
})
app.get('/garmin_page', function (req, res) {
	// res.send('Hello World!')
	res.render('garmin_page');
})
app.get('/ucsd_page', function (req, res) {
	// res.send('Hello World!')
	res.render('ucsd_page');
})
app.get('/amd_page', function (req, res) {
	// res.send('Hello World!')
	res.render('amd_page');
})

app.listen(port, function () {
	console.log('Website app listening on port 3000!')
})

