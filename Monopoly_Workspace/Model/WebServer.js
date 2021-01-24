class WebServer {



  var sessioni = [];
  var factory;

  constructor();


  function creaSessione(username) {
    var key = keyGen();
    var sessione = new Sessione(key);
    sessione.addGiocatore(username, "Master");
    sessioni.add(sessione);
    return key;
  }

  function accediSessione(username, codPartita) {
    getSessione(codPartita).addGiocatore(username, "Ospite");
  }

  function keyGen() {
    var key;
    do{
      key = randkey.get({
        length: 6,
        numbers: true
      });
    }while(getSessione(key));
    return key;
  }

  function getSessione(key) {
    forEach((sessioni, i) => {
      if(i.codicePartita = key){
        return i;
      }
    });
    return null;
  }

  function concludiSessione(codPartita){
    sessioni.delete(getSessione(codPartita));
  }
}

module.exports = webserver;
