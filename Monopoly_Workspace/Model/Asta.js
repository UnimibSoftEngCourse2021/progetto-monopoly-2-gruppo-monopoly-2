function Asta(prezzoIniziale,proprieta){
    this.prezzoIniziale=prezzoIniziale;
    this.proprieta=proprieta;
    var prezzoAttuale;
    var giocatoreVincente;



    function punta(puntata){
        prezzoAttuale = prezzoIniziale + puntata;
        giocatoreVincente = arguments.callee.caller;

    }
}