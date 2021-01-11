var express = require('express');
var Singleton = require('./Model/WebServerSingleton');
var router = express.Router();



/* GET home page. */
router.post('/attesa', function(req, res, next) {

  if(req.body.home_button.equal("Crea Partita")){ // Entra se il bottone ad esser stato schiacciato e "Crea Partita"
    var username = req.body.username; //salva in una variabile l'username scelto dal giocatore che ha creato la partita
    // var webServer = Singleton.getWebServerInstance(); //richiama l'istanza della classe WebServer
    // var codPartita = webServer.creaPartita(username); //dall'istanza WebServer richiama la funzione creaPartita
    res.render('attesa_m', {user : username}) //chiama il render della schermata d'attesa per la sessione TODO inserire
  }else if (req.body.home_button.equal("Unisciti")){// Entra se il bottone ad esser stato schiacciato e "Unisciti"
    var username = req.body.username; //salva in una variabile l'username dell'utente
    var codPartita = req.body.codPartita;
    //webServer = Singleton.getWebServerInstance(); //richiama l'istanza della classe WebServer
    //webServer.accediPartita(username, codPartita); //richiama la funzione accedi partita nell'istanza di WebServer
    res.render('attesa_u', username)
  }else{
    // res.render( , ) //Render della View di Gioco SchermataDiGioco
  }
});

module.exports = router;
