const express = require('express')
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
//#var MongoClient = require('mongodb').MongoClient;
//const {MongoClient} = require('mongodb');

let db;

// Connect to the db
// MongoClient.connect("mongodb://localhost:27017/JankenDb", { useUnifiedTopology: true }, function (err, db) {
//      useUnifiedTopology: true 
//      console.log("Trying Connection...");
//      if(err) throw err;

//      //Write databse Insert/Update/Query code here..
//      console.log("Connection Established");

     
     
//      var dbo = db.db("JankenDb");
//      dbo.createCollection("player_point" , function(err, res) {
//       if (err) {
//         console.log("ERROR? Could be it already exists");
//       }
//       console.log("Collection created!");
//       db.close();
//      });
                
// });

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
app.get('/2048_bot', function (req, res) {
  // res.send('Hello World!')
  res.render('blogs/2048_bot');
})
app.get('/genetic_xor', function (req, res) {
  // res.send('Hello World!')
  res.render('blogs/genetic_algorithm_decryption');
})
app.get('/janken_step', function (req, res) {
  // res.send('Hello World!')
  res.render('fun/janken_step');
})

// app.post('/player_point', (req, res) => {
//   const player_point = {point_Time: new Date()};
//   console.log(player_point);
//   console.log(db);

//   db.collection('player_point').save(player_point, (err, result) => {
//     if (err) {
//       return console.log(err);
//     }
//     console.log('Point added to db');
//     res.sendStatus(201);
//   });
// });


// app.get('/player_point', (req, res) => {

//   db.collection('player_point').find().toArray((err, result) => {
//     if (err) return console.log(err);
//     res.send(result);
//   });
// });


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

// MONGO DB Code
// async function main() {
//   // we'll add code here soon
//   const uri = process.env.MONGO_STRING;
//   const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//   await client.connect();

//   try {
//         // Connect to the MongoDB cluster
//         await client.connect();
 
//         // Make the appropriate DB calls
//         await  listDatabases(client);
 
//     } catch (e) {
//         console.error(e);
//     } finally {
//         await client.close();
//   }
// }

// main().catch(console.error);

// async function listDatabases(client){
//     databasesList = await client.db().admin().listDatabases();
 
//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };



