//file di test

let website = require('../index.js');

const http = require('http')
let assert = require('assert');
const { log } = require('util');


describe('Login', function () {
    describe('Login', function () {
        let cookie;
        it('Al primo acceso i cookie login è impostato su false', function () {
            const options = {
                hostname: 'localhost',
                port: 8080,
                path: '/',
            }
            http.get(options, res => {
                cookie = res.headers['set-cookie']
                assert.strictEqual(cookie[0].split(';')[0], "login=false");
            })
        });
        it('Ritorna i cookie impostati in base al login', function () {
            const postData = JSON.stringify({
                'email': 'user@gmail.com',
                'password': 'pass'
            });
            const options = {
                hostname: 'localhost',
                port: 8080,
                path: '/login',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(postData)
                }
            };
            const req = http.request(options, (res) => {
                const connrect = [
                    'usr=user%40gmail.com; Path=/',
                    'login=true; Path=/',
                    'job=user; Path=/'
                ]
                assert.strictEqual(res.headers['set-cookie'].toString(), connrect.toString());

            });
            req.write(postData);
        });
    });
    describe('Logout', function () {
        it('Eseguie il logout', function () {
            const options = {
                hostname: 'localhost',
                port: 8080,
                path: '/logout',
            };
            http.get(options, res => {
                cookie = res.headers['set-cookie']
                assert.strictEqual(cookie[0].split(';')[0], "login=false");
            })
        });
    });
    describe('Registrescion', function () {
        const postData = JSON.stringify(
            {
                "name": "TEST",
                "surname": "Test",
                "birth": "01/01/2001",
                "email": "TEST@gmail.com",
                "number": "123456789",
                "password": "pass",
                "payment":
                {
                    "nameholder": "Test T.",
                    "cardnumber": "1234123412341234",
                    "MM": "01",
                    "AA": "01",
                    "CVV": "321"
                }
            });
        it('Coretto invio dei dati', function () {
            const options = {
                hostname: 'localhost',
                port: 8080,
                path: '/registrazione',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(postData)
                }
            };
            const req = http.request(options, (res) => {
                assert.strictEqual(res.statusCode, 201)

            });
            req.write(postData);
        });
        it('Inserimento nel array', function () {
            delete website.users[website.users.length - 1]['job']
            assert.equal(website.users[website.users.length - 1].toString(), JSON.parse(postData).toString())
        });

    });
});
