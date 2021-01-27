var express = require('express');
//var Singleton = require('./Model/WebServerSingleton');
var router = express.Router();
var username;
var io = require('../socketapi').io;
var sessione = require('../Model/Sessione');
var webServer = require('../Model/WebServer');
var ws = new webServer();


io.on('connection', (socket) => {
  console.log("Utente connesso");
  console.log(socket.id);
  var key;
  socket.on('crea_sessione', (user) => {
    console.log("Utente master: " + user);
    this.key = ws.creaSessione(user);
    console.log(key);
    socket.join(key);
  });
  socket.emit('ricevi chiave', this.key);
  socket.on('unisciti', (data) => {
    console.log("Giocatore:" + data.user + "si è unito alla parita" + data.u_key);
    ws.accediSessione(data.user, data.u_key);
    socket.join(data.u_key);
    var ses = ws.getSessione(data.u_key);
    ses.giocatori.forEach((i) => {
      console.log(i.username);
    });
  })
});




/* GET home page. */
router.post('/', function(req, res, next) {
  console.log(req.body.home_button);
  if(req.body.home_button == "cp"){ // Entra se il bottone ad esser stato schiacciato e "Crea Partita"
    username = req.body.username; //salva in una variabile l'username scelto dal giocatore che ha creato la partita
    //var webServer = Singleton.getWebServerInstance(); //richiama l'istanza della classe WebServer
    //var codPartita = webServer.creaPartita(username); //dall'istanza WebServer richiama la funzione creaPartita
    res.render('attesa_m', {user : username}); //chiama il render della schermata d'attesa per la sessione TODO inserire
  }else if (req.body.home_button == "uni"){// Entra se il bottone ad esser stato schiacciato e "Unisciti"
    username = req.body.username; //salva in una variabile l'username dell'utente
    var codPartita = req.body.code_parita;
    //webServer = Singleton.getWebServerInstance(); //richiama l'istanza della classe WebServer
    //webServer.accediPartita(username, codPartita); //richiama la funzione accedi partita nell'istanza di WebServer
    res.render('attesa_u', {user: username, cod_p: codPartita});
  }else{
    //res.render( , ) //Render della View di Gioco SchermataDiGioco
  }
});

module.exports = router;
