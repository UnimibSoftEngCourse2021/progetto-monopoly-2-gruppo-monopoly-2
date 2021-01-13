class WebServer {
  var sessioni = [];
  var factory;

  creaSessione(username) {
    var key = keyGen();
    var sessione = new Sessione(key);
    sessione.addGiocatore(username, "Master");
    sessioni.add(sessione);
    return key;
  }

  accediSessione(username, codPartita) {
    getSessione(codPartita).addGiocatore(username, "Ospite");
  }

  keyGen() {
    var key;
    do{
      key = randkey.get({
        length: 6,
        numbers: true
      });
    }while(getSessione(key));
    return key;
  }

  getSessione(key) {
    forEach((sessioni, i) => {
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
