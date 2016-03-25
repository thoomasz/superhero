//Beolvasuk a szükséges csomagokat
var express = require('express');
var fs = require('fs');
var port = 3333;
var staticDir = "build";

//az indulásnál betölti magának ami neki kell
//egy alkalmazás szerverpéldányt ad vissza
var app = express();

// GET /style.css etc
app.use(express.static(staticDir));


//definiáljuk a szerver működést 
app.get('/', function (req, res) {
    fs.readFile('./' + staticDir + '/index.html', 'utf8', function (err, data) {
        res.send(data);
    });
});

//Felhasználó modell
function handleUsers(req, res) {

    fs.readFile('./users.json', 'utf8', function (err, data) {
        if (err) throw err;
        //      console.log(data);
        //      var path = req.url.split( '/' )
        var user = JSON.parse(data);
        var _user = {};

        if (!req.params.id) {
            _user = user;
        } else {
            for (var k in user) {
                //   if ( path[2] == user[k].id) {
                if (req.params.id == user[k].id) {
                    _user = user[k];
                }
            }
        }
        res.send(JSON.stringify(_user));
    });

}

//Felhasználók beolvasása
app.get('/users/:id*?', function (req, res) {
    //    console.log( req.url );
    handleUsers(req, res);
});


//a szerver melyik portot figyelje
app.listen(port);

console.log(port);