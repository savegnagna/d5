const express = require('express')
const app = express()
const port = 3000;
const path = require('path');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const bodyParser = require('body-parser');
const { ok } = require('assert');
const { json } = require('express/lib/response');


app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

//cookie parser init
app.use(cookieParser());

/*
  Loading the data of the user and coupon the static file
  ?implement a DBMS
*/
let users;
fs.readFile(path.join(__dirname, './data/users.json'), 'utf8', function (err, data) {
  if (err) throw err;
  users = JSON.parse(data);
});

let coupons;
fs.readFile(path.join(__dirname, './data/coupons.json'), 'utf8', function (err, data) {
  if (err) throw err;
  coupons = JSON.parse(data);
});

/*
  Search for the user by email
*/
function searchUser(email) {
  return users.filter(item => item.email == email)
}

/*
  Main Page with testing for login status
*/
app.get('/', (req, res) => {
  /*
    For user without login cookie or not login 
    it will be creted and set the cookie to false
  */
  if (req.cookies.login === undefined || req.cookies.login === 'false') {
    res.cookie('login', 'false', { maxAge: 86400 })
    res.sendFile('public/index.html', { root: __dirname })
  }
  // return page based on the user cookies
  else if (req.cookies.login === 'true') {
    switch (req.cookies.job) {
      case 'driver':
        res.sendFile('public/homeautista.html', { root: __dirname })
        break;
      case 'user':
        res.sendFile('public/homecliente.html', { root: __dirname })
        break;

      default:
        res.status(500).send('errore in login --- reset cookies')
        break;
    }
  }
  else {
    res.status(500).send("si è verificato un errore")
  }
})

/*
  Change status to logout
*/
app.get('/logout', (req, res) =>{
  res.cookie('login', 'false', { maxAge: 86400 })
  res.redirect('./');
})

//POST login endpoint
app.post('/login', (req, res) => {
  let finder = searchUser(req.body.email)
  if (finder[0] === undefined) {
    res.status(500).send("Incorect credencial")
  } else {
    //Set all cookie for login
    res.cookie('usr', finder[0].email)
    res.cookie('login', 'true')
    res.cookie('job', finder[0].job)
    res.status(200).send()
  }
})

//POST registrazione endpoint
app.post('/registrazione', (req, res) => {
  // console.log(req.body.email == users.filter(item => item.email == req.body.email)[0].email);
  try {
    if (req.body.email == users.filter(item => item.email == req.body.email)[0].email) {
      res.status(406).send("email already present");
    } 
  } catch (error) {
    let new_user = req.body;
    new_user.job = 'user';

    users.push(new_user);

    fs.writeFile(path.join(__dirname, './data/users.json'), JSON.stringify(users), err => {
      if (err) {
        console.error(err)
      }
    })
    res.redirect('/')
  }
})

/*
  GET personal coupon
  todo test login in account
  todo reserce spesific account
*/
app.get('/coupons.json', (req, res) => {

  let finded = coupons.filter(item => item.email === req.cookies.usr)
  res.send(finded[0])
});

// !provisorial use of static file
app.use(express.static(path.join(__dirname, 'public'), { extensions: ['html'] }));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})