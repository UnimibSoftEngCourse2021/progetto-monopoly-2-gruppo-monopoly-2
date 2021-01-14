class contratto{

    constructor(valore,rendita,valoreIpotecario,costoCasa,costoAlbergo, edificabile){

        this.valore= valore;
        this.rendita = rendita;
        this.valoreIpotecario = valoreIpotecario;
        this.costoCasa = costoCasa;
        this.costoAlbergo = costoAlbergo;
        this.edificabile = edificabile;
        this.proprieta = arguments.callee.caller;
        this.ipotecato = false;

    }
}