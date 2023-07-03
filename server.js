const express = require('express')
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const {spawn} = require('child_process');
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

// Parse URL-encoded bodies (as sent by HTML forms)
//app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
//app.use(express.json());

app.use(express.static(__dirname + '/assets'));
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}));
//app.use(bodyParser.json());


app.get('/.well-known/acme-challenge/Tu-OKRCGPX9YlzcfKKQRhFMr68hJn08GNgO12uq-7_o', function(req, res) {
  res.send(process.env.LE_CONTENT)
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
app.get('/movie_compare', function (req, res) {
  // res.send('Hello World!')
  res.render('fun/movie_compare');
})

app.get('/snake', function (req, res) {
  // res.send('Hello World!')
  res.render('fun/snake');
})

app.get('/snake_ai', function (req, res) {
  // res.send('Hello World!')
  res.render('projects/snake_ai');
})

app.get('/python_test', function (req, res) {
  // res.send('Hello World!')
  res.render('fun/python_test');
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

// POST route to python_test
app.post('/python_test', function (req, res) {
  var dataToSend;
  // spawn new child process to call the python script
  console.log("Number is " + req.body.num)
  const python = spawn('python3', ['python_test.py']);
  // collect data from script
  python.stdout.on('data', function (data) {
  console.log('Pipe data from python script ...');
  dataToSend = data.toString();
 });
 // in close event we are sure that stream from child process is closed
 python.on('close', (code) => {
 console.log(`child process close all stdio with code ${code}`);
 // send data to browser
 res.send(dataToSend)
  });
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

const fs = require('fs');
//console.log(process.env.OMDB_KEY)
fs.writeFile("assets/js/fun/config.js", 'const apiKey = "' + process.env.OMDB_KEY + '";', function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
}); 

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



