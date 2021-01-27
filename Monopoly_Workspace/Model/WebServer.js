
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
    console.log(username);
    console.log(codPartita);
    var temp = this.getSessione(codPartita);
    console.log(temp);
    temp.addGiocatore(username, "Ospite");
  }

  keyGen() {
    var key;
    do{
      key = Math.round(Math.random() * 1000000);
    }while(this.getSessione(key));
    return key;
  }

  getSessione(key) {
    console.log("cip");
    var ris = null;
    this.sessioni.forEach((i) => {
      console.log("cod : " + i.codicePartita + " key : " + key);
      if(i.codicePartita == key){
        ris = i;
      }
    });
    return ris;
  }

  concludiSessione(codPartita){
    this.sessioni.delete(getSessione(codPartita));
  }
}

module.exports = WebServer;
