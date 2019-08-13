const express = require('express')
const app = express()

const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/assets'));
app.set('view engine', 'ejs')

app.get('/.well-known/acme-challenge/FSAUh04H3iXSqjHXXfvgQZ7y8k9U5Pz3giZYuDLxDPo', function(req, res) {
  res.send('FSAUh04H3iXSqjHXXfvgQZ7y8k9U5Pz3giZYuDLxDPo.96BF3Cazuj4DF3MFKt4XU2VuOuOzqP0P0rX6JWtoEYg')
})

app.get('/', function (req, res) {
	// res.send('Hello World!')
	res.render('index');
})

app.listen(port, function () {
	console.log('Example app listening on port 3000!')
})

