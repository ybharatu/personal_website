const express = require('express')
const app = express()

const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/assets'));
app.set('view engine', 'ejs')

if (process.env.LE_URL && process.env.LE_CONTENT) {
  app.get(process.env.LE_URL, function(req, res) {
    return res.send(process.env.LE_CONTENT)
  });
}

app.get('/', function (req, res) {
	// res.send('Hello World!')
	res.render('index');
})

app.listen(port, function () {
	console.log('Example app listening on port 3000!')
})

