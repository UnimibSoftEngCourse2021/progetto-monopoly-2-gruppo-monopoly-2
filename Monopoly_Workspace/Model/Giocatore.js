
class giocatore{
    
    
    constructor(username, tipoGiocatore){
    this.username=username;
    this.tipoGiocatore = tipoGiocatore;
    var soldi;
    var cotrattti;
    var sessione;
    var posizione = 1;
    var tipoPedina;
    var turniPrigione = 0;
    }


    tiradadi(){
        var valoreDadi = []
        valoreDadi[0] = Math.random();
        valoreDadi[1] = Math.random();

        cambiaPosizione(valoreDadi[0]+valoreDadi[1]);
    }
    passaTurno(){

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

}






