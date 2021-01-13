//// TODO: rifinire cambiaPosizione, costruisciCostruzione, getMonopolio, vendiCostruzione, ipotecaProprieta, riscattaIpoteca, rimuoviProprieta,addProprieta


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
      if(getMonopolio(contratto)){

      }
    }

    //restituisce true se il giocatore ha il monopolio del contratto passato
    getMonopolio(contratto){
      forEach((sessione.board.caselle, i) => {
        if (i.colore) {

        }
      });
    }

    //funzione che viene chiamata quando si vuole costruire una casa o albergo su una proprieta
    vendiCostruzione(contratto){

    }

    //quando si vuole ipotecare una proprieta
    ipotecaProprieta(contratto){

    }

    //quando si vuole riscattare un ipoteca
    riscattaIpoteca(contratto){

    }

    //aggiunge una proprieta alla lista
    addProprieta(contratto){

    }

    //rimuove una proprieta dalla lista
    rimuoviProprieta(contratto){

    }




}
