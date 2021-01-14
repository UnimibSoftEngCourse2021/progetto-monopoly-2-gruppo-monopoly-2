class asta{

    constructor(prezzoIniziale,proprieta){
        this.prezzoIniziale=prezzoIniziale;
        this.proprieta=proprieta;
        var prezzoAttuale;
        var giocatoreVincente;
    }


    punta(puntata){
        this.prezzoAttuale = prezzoIniziale + puntata;
        this.giocatoreVincente = arguments.callee.caller;

    }
}