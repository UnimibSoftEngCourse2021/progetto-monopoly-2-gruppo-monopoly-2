//// TODO: rifinire cambiaPosizione


class giocatore{

  var username;
  var tipoGiocatore;
  var soldi;
  var cotrattti;
  var sessione;
  var posizione;
  var tipoPedina;
  var turniPrigione;
  var loyaltyPoints;
  var cartaPrigione;
  var numeroTurno;


    constructor(username, tipoGiocatore, sessione, turno){
      this.username = username;
      this.tipoGiocatore = tipoGiocatore;
      this.soldi = 0;
      this.contratti = [];
      this.sessione = sessione;
      this.posizione = 1
      this.tipoPedina = //// TODO:
      this.loyaltyPoints = 0;
      this.cartaPrigione = false;
      this.turniPrigione = 0;
      this.numeroTurno = turno;
    }



    //si occupa di tirare i dadi e di spostare la pedina
    tiraDadi(){
        var valoreDadi = []
        valoreDadi[0] = Math.random();
        valoreDadi[1] = Math.random();
        if(this.turniPrigione == 0){ //non sei in prigione
          cambiaPosizione(valoreDadi[0]+valoreDadi[1]);
        }else{ //sei in prigione
          if(valoreDadi[0] == valoreDadi[1]){ //dadi uguali => si esce di prigione
            cambiaPosizione(valoreDadi[0]);
          }else if(turniPrigione == 3){ //raggiunto il numero massimo di turni in prigione
            paga("Banca", 125);
            cambiaPosizione(valoreDadi[0]+valoreDadi[1]);
          }else{ //aumenta il numero di turni attuali in prigione
            turniPrigione++;
          }
        }
    }




    cambiaPosizione(cambioPosizione){
        this.posizione()+=cambioPosizione;

        switch (this.posizione()){
            case 1:
                Banca.riceviIndennita();
                break;
            case 31:
                this.posizione= 11;
                this.turniPrigione=1;
                break;
            case 2:case 18:case 34:
                Board.pescaCarta("Probabilita");
                break;
            case 8 : case 23: case 37:
                Board.pescaCarta("Imprevisti");
                break;
            case 5: case 39:
                this.paga("Banca");
                break;
            default:
                var propAttuale = Board.caselle();
                propAttuale[this.posizione].offertaAcquisto();

        }
    }

    //pago una certa quantita di loyalty points, restituisce il resto dei soldi da pagare
    pagaLoyaltyPoints(denaro){
      if(denaro > loyaltyPoints){ //se il denaro da pagare e maggiore dei loyaltyPoints li azzero e restituisco il resto da pagare
        loyaltyPoints = 0;
        return denaro - loyaltyPoints;
      }else{ //se bastano i loyaltyPoints allora li diminuisco e restituisco 0
          loyaltyPoints = loyaltyPoints - denaro;
          return 0;
      }
    }

    //pago una certa quantita di denaro ad un beneficiario
    paga(beneficiario, denaro){
      if(getPatrimonioTotale() < denaro){ //se non si ha abbastanza denaro si perde la partita
        perditaPartita();
      }else {
        var nuovoPrezzo = pagaLoyaltyPoints(denaro); //pago con la quantita di loyalty points sufficente
        if(beneficiario.equals("Banca")){ //se si deve pagare la banca vengono solo scalati i soldi
          soldi = soldi - nuovoPrezzo;
        }else{ //se va pagato un giocatore si scalano i soldi e si aggiungono a lui
          soldi = soldi - nuovoPrezzo;
          beneficiario.soldi = beneficiario.soldi + denaro;
        }
      }
    }

    //restituisce il patrimonio tottale = denaro posseduto + valore delle proprieta
    getPatrimonioTotale(){
      var pat = 0;

      forEach((contratti, i) => { //scorro tutte le proprieta possedute e sommo il lovo valore da ipotecate a pat
        pat = pat + (i.valore / 2);
      });

      pat = pat + denaro = loyaltyPoints; //sommo a pat la quantita di denario che si ha
      return pat;
    }


    //funzione che viene chiamata quando un giocatore va in bancarotta
    perditaPartita(){
      sessione.bancarottaGiocatore(this);
    }

    //funzione che viene chiamata quando si vuole costruire una casa o un albergo su una proprieta
    costruisciCostruzione(contratto){
      if (contratto.numeroCase < 4 && possoCostruire(contratto)) { // verifico se devo costruie una casa e posso costruire
        contratto.numeroCase++; //costruisco una casa
        sessione.banca.numeroCase--; //tolgo alla banca
        return true;
      } else if (contratto.numeroCase = 4 &&
                 sessione.banca.numeroAlberghi != 0 &&
                 possocCostruire(contratto)) { // verifico se devo costruire un albergo e se posso costruirlo
        contratto.numeroAlberghi = 1; //costruisco albergo
        contratto.numeroCase = 0; // tolgo le case
        sessione.banca.numeroCase += 4; //prendo e resttuisco alla banca quallo che mi spetta
        sessione.banca.numeroAlberghi--;
        return true;
      }else {
        return false;
      }
    }

    //ipotizzo che il numro di case di una proprieta sia nel contratto : da verificare
    //prende un contratto come input e restituisce se e possibile costruire case su quella casella
    possoCostruire(contratto){
      if (getMonopolio(contratto) ||
          contratto.numeroAlberghi != 0 ||
          sessione.banca.numeroCase != 0) { //controllo se si ha il monopolio
        var ris = true;
        forEach((contratti, i) => { //controllo per ogni proprieta se il numero di case permette di costruirne un'altra
          if (i.colore = contratto.colore) {
            if (i.numeroAlberghi == 0 && //controllo se il numero di case per ogni proprieta del monopolio se soddisfano i requisiti
                i.numeroCase < contratto.numeroCase) {
              ris = false;
            }
          }
        });
        return ris;
      }else{
        return false;
      }
    }

    //restituisce true se il giocatore ha il monopolio del contratto passato
    getMonopolio(contratto){
      var val1 = 0, val2 = 0;
      forEach((contratti, i) => { //conto la quantita di contratti del giocatore dello stesso colore di contratto come parametro
        if (i.colore == contratto.colore) {
          val1++;
        }
      });
      forEach((sessione.board.caselle, i) => {// conto la quantita di contratti nulla board dello stesso colore del contratto passato per parametri
        if (i instanceof Proprieta &&
            i.edificabile &&
            i.contratto.colore == contratto.colore) {
          val2++;
        }
      });
      if (val1 == val2) {// se i due risultati sono uguali allora rignifica che l'utente ha il monopolio di quel colore
        return true;
      }else{ // altrimenti non li ha tutti
        return false;
      }

    }

    //funzione che viene chiamata quando si vuole costruire una casa o albergo su una proprieta
    vendiCostruzione(contratto){
      if (possoVendere(contratto)) { //controll che si possa vendere
        if (contratto.numeroAlberghi != 0) { // decido se si dee vendere una casa o un albergo
          contratto.numeroAlberghi--;
          sessione.banca.numeroAlberghi++;
          return true;
        } else { //nel caso non ci siano alberghi allora vendo una casa
          contratto.numeroCase--;
          sessione.banca.numeroCase++;
          return true;
        }
      }
      return false;
    }

    possoVendere(contratto){
      var ris = true;
      forEach((contratti, i) => { // scorro tutte le proprietà possedute dal giocatore
        if(i.colore == contratto.colore) { //se la Proprieta del giocatore è dello stesso colore di quella passata come parametro
          if (contratto.numeroAlberghi == 0 &&
              (i.numeroCase > contratto.numeroCase ||
               (i.numeroAlberghi != 0 && contratto.numeroCase == 4))) {
                 ris = false;
          }
        }
      });
      return ris;
    }

    //quando si vuole ipotecare una proprieta
    ipotecaProprieta(contratto){
      var verifica = true;
      forEach((contratti, i) => { //verifico che su tutto il gruppo di proprieta del monopolio non ci siano Proprieta
        if (i.colore == contratto.colore &&
            (i.numeroCase != 0 ||
             i.numeroAlberghi != 0)) {
              varifica = false;
        }
      });
      if (contratto.ipotecato == false && vrifica) { //se il contratto non è gia ipotecato e verifica == true allora ipoteco la proprieta
        contratto.impotecato = true;
        this.soldi += (contratto.valore / 2); //aggiungo i soldi dell'ipoteca al giocatore
        return true;
      }
      return false;
    }

    //quando si vuole riscattare un ipoteca
    riscattaIpoteca(contratto){
      var prezzo = (contratto.valore / 2) + (contratto.valore * 10 / 100);
      if (contratto.ipotecato == true) { //controllo che la proprieta sia ipotecata
        paga("Banca", prezzo); //pago alla banca il prezzo da pagare
        contratto.ipotecato = false; //deipoteco la proprietà
        return true;
      }
      return false;
    }

    //aggiunge una proprieta alla lista
    addProprieta(contratto){
      if (contratto != null) {
        this.contratti.add(contratto);
      }
    }

    //rimuove una proprieta dalla lista
    rimuoviProprieta(contratto){
      if (contratto != null) {
        this.contratti.delete(contratto);
      }
    }
}
