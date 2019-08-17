const express = require('express')
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
require('dotenv').config();

const app = express()

const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/assets'));
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}));
global.document = new JSDOM('index').window.document;

	

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

// POST route from contact form
app.post('/contact', function (req, res) {
  let mailOpts, smtpTrans;
  smtpTrans = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });
  mailOpts = {
    from: req.body.name + ' &lt;' + req.body.email + '&gt;',
    to: process.env.GMAIL_USER,
    subject: 'New message from contact form at yashbharatula.com',
    text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
  };
  smtpTrans.sendMail(mailOpts, function (error, response) {
    if (error) {
      // res.render('contact-failure');
      res.render('contact-failure')
    }
    else {
      // res.render('contact-success');
      res.render('contact-success')
    }
  });
});

app.get('/python/add', function(req, res) {
	const { spawn } = require('child_process');
	console.log("First op is " + document.getElementById('num1'));
	console.log("Second op is " + document.getElementById('num2'));

    const pyProg = spawn('python', ['/python/add.py', req.body.op1, req.body.op2]);

    pyProg.stdout.on('data', function(data) {
        console.log(data.toString());
        // res.write(data);
        // res.end('end');
        document.getElementById("pyresult").value = data;
    });
});

app.listen(port, function () {
	console.log('Website app listening on port 3000!')
})

