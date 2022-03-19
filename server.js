const express = require('express')
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express()

const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/assets'));
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}));


app.get('/.well-known/acme-challenge/Tu-OKRCGPX9YlzcfKKQRhFMr68hJn08GNgO12uq-7_o', function(req, res) {
  res.send('Tu-OKRCGPX9YlzcfKKQRhFMr68hJn08GNgO12uq-7_o.96BF3Cazuj4DF3MFKt4XU2VuOuOzqP0P0rX6JWtoEYg')
})

app.get('/', function (req, res) {
	// res.send('Hello World!')
	res.render('index');
})
app.get('/purdue_page', function (req, res) {
	// res.send('Hello World!')
	res.render('experiences/purdue_page');
})
app.get('/garmin_page', function (req, res) {
	// res.send('Hello World!')
	res.render('experiences/garmin_page');
})
app.get('/ucsd_page', function (req, res) {
	// res.send('Hello World!')
	res.render('experiences/ucsd_page');
})
app.get('/amd_page', function (req, res) {
	// res.send('Hello World!')
	res.render('experiences/amd_page');
})
app.get('/blog', function (req, res) {
	// res.send('Hello World!')
	res.render('blog');
})
app.get('/vim_ref', function (req, res) {
  // res.send('Hello World!')
  res.render('blogs/vim_ref');
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
  if (parseInt( req.body.answer) == 10) {
    console.log("Correct Answer") 
    smtpTrans.sendMail(mailOpts, function (error, response) {
      if (error) {
        // res.render('contact-failure');
        res.render('status/contact-failure')
      }
      else {
        // res.render('contact-success');
        res.render('status/contact-success')
      }
    });
  }
  else {
	console.log("Wrong Answer " + req.body.answer)
    res.render('status/contact-failure')
  }
});

app.listen(port, function () {
	console.log('Website app listening on port 3000!')
})

