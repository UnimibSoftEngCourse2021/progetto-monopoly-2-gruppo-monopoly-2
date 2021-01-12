class Banca{

    constructor(){
    var numeroCase=40;
    var numeroAlberghi=20;
    var Asta;
    }


    creaAsta(prezzoIniziale,proprieta){
        this.Asta = new Asta(prezzoIniziale,proprieta);

    }

    riceviIndennita(){
        Giocatore.soldi()+= 100;
    }

    ChiudiAsta(){
        // Da implementare
    }

}