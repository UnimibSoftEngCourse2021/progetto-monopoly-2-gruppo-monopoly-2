
var Sessione =require('./Sessione');
class WebServer {
   sessioni = [];
   factory;

  creaSessione(username) {
    var key = this.keyGen();
    var sessione = new Sessione(key);
    sessione.addGiocatore(username, "Master");
    this.sessioni.push(sessione);
    return key;
  }

  accediSessione(username, codPartita) {
    getSessione(codPartita).addGiocatore(username, "Ospite");
  }

  keyGen() {
    var key;
    do{
      key = Math.round(Math.random() * 1000000);
    }while(this.getSessione(key));
    return key;
  }

  getSessione(key) {
    this.sessioni.forEach((i) => {
      if(i.codicePartita = key){
        return i;
      }
    });
    return null;
  }

  concludiSessione(codPartita){
    sessioni.delete(getSessione(codPartita));
  }
}

module.exports = WebServer;
