const express = require('express')
const app = express()
exports.app = app;

const port = 3200;
const path = require('path');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');


app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

//cookie parser init
app.use(cookieParser());

app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store')
    next()
})

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Library API",
            version: "1.0.0",
            description: "Un applicazione per il noleggio dei velocipedi elettrici e per il carsharing"
        },
        servers: [
            {
                url: "http://localhost:3200"
            }
        ],
    },
    apis: ["./index.js", "swagger_doc.js"]
}

const specs = swaggerJsDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

/*
  Loading the data of the user and coupon the static file
*/
let users = JSON.parse(fs.readFileSync(path.join(__dirname, './data/users.json'), 'utf8'));
exports.users = users;

let coupons = JSON.parse(fs.readFileSync(path.join(__dirname, './data/coupons.json'), 'utf8'));
exports.coupons = coupons;


/*
  Search for the user by email
*/
function searchUser(email) {
    return users.filter(item => item.email == email)
}
exports.searchUser = searchUser;

/**
 * @swagger
 * /:
 *   get:
 *     summary: Verifica di accesso e ritorno della homepage
 *     description: Ritorna la homepage correta del utente utilizando il cookie della email, quello del ruolo e verificando se l'utente ha il cookie login impostato a true
 *     tags: [Home]
 *     responses:
 *       200:
 *         description: Ritorna la homepage del utente in formato html
 *       401:
 *         desciption: Errore di login causato da un problema di cookie impostati a valori sbagliati
 *       500:
 *         description: Errore inaspettato dovuto a una possibile manomissione dei cookies
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
                res.status(401).send('errore in login --- reset cookies')
                break;
        }
    }
    else {
        res.status(500).send("si è verificato un errore")
    }
})

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Esegue il controlo dei dati e invia i cookies
 *     description: Controlla le credenziali del utente utilizando il json correlato e invia i cookies all'utente contenenete la sua email e il proprio ruolo
 *     tags: [Access]
 *     responses:
 *       200:
 *         description: Il login ha avuto sucesso
 *       401:
 *         description: L'acceso è fallito perché non si è verificato un riscontro con le credenziali
 *         
*/
app.post('/login', (req, res) => {
    let finder = searchUser(req.body.email)
    if (finder[0].email === req.body.email && finder[0].password === req.body.password) {
        //Set all cookie for login
        res.cookie('usr', finder[0].email)
        res.cookie('login', 'true')
        res.cookie('job', finder[0].job)
        res.status(200).send()
    } else {
        res.status(401).send("Incorect credencial")
    }
})

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Esegue il logout
 *     description: Viene impostato il cookie login a false, il che rende l'utente disconnesso anche se continua avere i cookies di login
 *     tags: [Access]
 *     responses:
 *       302:
 *         description: Non ci sono stati problimi, l'utente viene rindirizato alla pagina di login
*/
app.get('/logout', (req, res) => {
    res.cookie('login', 'false', { maxAge: 86400 })
    res.redirect(302, "/")
})

/**
 * @swagger
 * /registrazione:
 *   post:
 *     summary: Registrazione utente
 *     description: Registrazione con scrittura async del utente sul disco, impostando il ruolo a job
 *     tags: [Access]
 *     responses:
 *       201:
 *         description: Registrazione avvenuta con successo
 *       406:
 *         description: Email è gia presente
*/
app.post('/registrazione', (req, res) => {
    // console.log(req.body.email == users.filter(item => item.email == req.body.email)[0].email);
    try {
        if (req.body.email === users.filter(item => item.email == req.body.email)[0].email) {
            res.status(406).send("email already present");
        }
    } catch (error) {
        let new_user = req.body;
        new_user.job = 'user';

        users.push(new_user);
        if (new_user.email !== "TEST@gmail.com") {
            fs.writeFile(path.join(__dirname, './data/users.json'), JSON.stringify(users), err => {
                if (err) {
                    console.error(err)
                }
            })
        }
        res.redirect(201, '/')
    }
})

/**
 * @swagger
 * /coupons:
 *   get:
 *     summary: Ritorno dei coupon dell'utente
 *     description: Ritorno in formato application/json dei coupon associati ad un determinato account
 *     tags: [coupon]
 *     responses:
 *       200:
 *         description: Dati trovati con successo
 *       500:
 *         description: Nessuna istanza dell'email nel file, il che dovrebbe essere imposibilie 
*/
app.get('/coupons', (req, res) => {

    let finded = coupons.filter(item => item.email === req.cookies.usr)
    if (finded[0] !== undefined) {
        res.send(finded[0])
    }
    else {
        res.status(500).send("Data not present, even if it should");
    }
});

/**
 * todo implemtentare inzio delle bici e monopatini lato server e non generati via codice
 */

// !provisorial use of static file for html satic page
app.use(express.static(path.join(__dirname, 'public'), { extensions: ['html'] }));

const server = app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})

exports.server = server;