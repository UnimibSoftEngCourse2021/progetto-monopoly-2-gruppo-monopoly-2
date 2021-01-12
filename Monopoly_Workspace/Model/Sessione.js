//TODO scrivere la funzione inizializza

class ClassName {

  var codicePartita;
  var modalitaPartita;
  var tempo;
  var difficoltaPartita;
  var dynamicValue;
  var giocatori = [];
  var trattative = [];
  var board;
  var turnoGiocatore;
  var banca;


  constructor(codicePartita) {
    this.codicePartita = codicePartita;
  }

  //inizializza una sessione, viene chiamata quando il giocatore master
  //lascia la sala d'attesa.
  function inizializza() {

  }

  //restituisce un giocatore della sessione in base all'username dato in input
  function getGiocatore(username) {
    forEach((giocatori, i) => {
      if(i.username == username){
        return i;
      }
    });
    return null;
  }

  //aggiunge un giocatore alla sessione in questione e quindi anche alla lista
  function addGiocatore(username, tipo) {
    giocatori.add(new Giocatore(username, tipo));
  }

  //inizia una trattativa e la aggiunge alla lista.
  //offerta : puo assumere valore numerico in caso di soldi o una proprieta
  //richiesta : lo stesso di offerta
  //offerente : username dell'utente offerente
  //aquirente : username dell'utente aquirente
  function inizioTrattativa(offerta, richiesta, offerente, aquirente) {
    var offerente = getGiocatore(offerente);
    var aquirente = getGiocatore(aquirente)
    trattative.add(new Trattativa(offerta, richiesta, this.offerente, this.aquirente))
  }

  //setta l'esito di una trattativa, se l'esito risulta positivo allora
  //la funzione chiama valuta esito trattativa
  function setEsitoTrattativa(esito, offerta, richiesta,offerente, aquirente) {
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
  function valutaEsitoTrattative(trattativa) {
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
  function getTrattativa(offerta, richiesta, offerente, aquirente) {
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
  function bancarottaGiocatore(username) {
    giocatori.delete(getGiocatore(username));
  }

}
