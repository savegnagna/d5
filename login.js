const fs = require('fs');
//POST login endpoint
function name(app, users) {

    app.post('/login', (req, res, next) => {
        let finder = users.filter(item => item.email == req.body.email)
        if (finder[0] === undefined) {
            res.send("Incorect credencial")
        } else {
            console.log(finder[0]);
            res.cookie('usr', finder[0].email)
            res.cookie('login', 'true')
            res.cookie('job', finder[0].job)
            res.sendStatus(200)
        }
        next()
    })
}
module.exports = name;