
function Giocatore (username){
    this.username=username;
    var soldi;
    var cotrattti;
    var sessione;
    var posizione = 0;





    function tiradadi(){
        var valoreDadi = []
        valoreDadi[0] = Math.random();
        valoreDadi[1] = Math.random();

        cambiaPosizione(valoreDadi[0]+valoreDadi[1]);
    }
    function passaTurno(){

    }

    function cambiaPosizione(cambioPosizione){
        Giocatore.posizione()+=cambioPosizione;
        

    }

    
}





