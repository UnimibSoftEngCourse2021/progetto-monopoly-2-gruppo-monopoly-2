//TODO scrivere la funzione inizializza
//var giocatore = require('./Giocatore');
class Sessione {

  codicePartita;
  modalitaPartita;
  tempo;
  difficoltaPartita;
  dynamicValue;
  giocatori = [];
  trattative = [];
  board;
  turnoGiocatore;
  banca;


  constructor(codicePartita) {
    this.codicePartita = codicePartita;
  }

  //inizializza una sessione, viene chiamata quando il giocatore master
  //lascia la sala d'attesa.
  inizializza() {

  }

  //restituisce un giocatore della sessione in base all'username dato in input
  getGiocatore(username) {
    this.giocatori.forEach((i) => {
      if(i.username == username){
        return i;
      }
    });
    return null;
  }

  //aggiunge un giocatore alla sessione in questione e quindi anche alla lista
  addGiocatore(username, tipo) {
    if(this.giocatori.length <= 5){
      this.giocatori.add(new Giocatore(username, tipo, this, giocatori.length + 1));
      return true;
    }else{
      return false;
    }
  }

  //inizia una trattativa e la aggiunge alla lista.
  //offerta : puo assumere valore numerico in caso di soldi o una proprieta
  //richiesta : lo stesso di offerta
  //offerente : username dell'utente offerente
  //aquirente : username dell'utente aquirente
  inizioTrattativa(offerta, richiesta, offerente, aquirente) {
    var offerente = getGiocatore(offerente);
    var aquirente = getGiocatore(aquirente)
    trattative.add(new Trattativa(offerta, richiesta, this.offerente, this.aquirente))
  }

  //setta l'esito di una trattativa, se l'esito risulta positivo allora
  //la funzione chiama valuta esito trattativa
  setEsitoTrattativa(esito, offerta, richiesta,offerente, aquirente) {
    var trattativa  = getTrattativa(offerta, richiesta,offerente, aquirente);
    trattativa.esito = esito;
    if(esito == false){
      trattative.remove(trattativa);
    }else{
      valutaEsitoTrattative(trattativa);
      trattative.remove(trattativa);
    }

  }

  //si occupa di eseguire le azioni ce conseguono dall'accettazione di un offerta
  valutaEsitoTrattative(trattativa) {
    var offerta = trattativa.offerta;
    var richiesta = trattativa.richiesta;
    var offerente = trattativa.offerente;
    var aquirente = trattativa.aquirente;
    if (typeof offerta == "number" && typeof richiesta == "object") {
      offerente.addProprieta(richiesta);
      aquirente.rimuoviProprieta(richiesta);
      offerente.paga(aquirente, offerta);
    }else if (typeof offerta == "object" && typeof richiesta == "number") {
      aquirente.paga(offerente, richiesta);
      offerente.rimuoviProprieta(offerta);
      aquirente.addProprieta(offerta);
    }else if (typeof offerta == "object" && typeof richiesta == "object") {
      aquirente.rimuoviProprieta(richiesta);
      offerente.addProprieta(richiesta);
      offerente.rimuoviProprieta(offerta);
      aquirente.addProprieta(offerta);
    }
  }

  //prende in input dei dati e restitutisce una trattativa con quei dati
  getTrattativa(offerta, richiesta, offerente, aquirente) {
    forEach((trattative, i) => {
      if (i.offerta == offerta &&
         i.richiesta == richiesta &&
         i.offerente.username == offerente &&
         i.aquirente.username == aquirente) {
           return i;
      }
    });
    return null;
  }

  //funzione che viene chiamata se un giocatore va in bancarotta e che lo elimina
  //dalla lista dei giocatori
  bancarottaGiocatore(giocatore) {
    giocatori.delete(giocatore);
  }


  passaTurno(){
    turnoGiocatore = next(turnoGiocatore);
  }

  //funzione che restituisce, dato un giocatore in input, il giocatore col turno successivo
  next(giocatore){
    if (giocatore.numeroTurno != giocatori.length + 1){
      forEach((giocatori, i) => {
        if(i.numeroTurno + 1 == giocatore.numeroTurno){
          return i;
        }
      });
    }else{
      forEach((giocatori, i) => {
        if (i.numeroTurno == 1) {
          return i;
        }
      });
    }
  }
}

module.exports = Sessione;