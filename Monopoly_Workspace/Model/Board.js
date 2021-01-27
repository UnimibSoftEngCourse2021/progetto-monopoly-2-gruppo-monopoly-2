
var arrayCaselle = require("../public/informazioniBoard/Caselle.json");
var arrayImprevisti = require("../public/informazioniBoard/Imprevisti.json");
var arrayProb = require("../public/informazioniBoard/Probabilita.json");
var arrayContratti = require ("../public/informazioniBoard/Contratto.json")
console.log(arrayProb);
-
function sattolo(array) {
    const len = array.length;
    for (let i = 0; i < len - 1; i++) { // 0 to n -1, exclusive because the last item doesn't need swapping
        let j = Math.floor(Math.random() *  (len-(i+1)))+(i+1); // i+1 to len, exclusive
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}


class Board{

    constructor(){

        var caselle = [];
        var carteProb = [];
        var carteImp = [];
        this.sessione = arguments.callee.caller; 
    }
    

    setCaselle() {
        for(let i = 1;i<= arrayCaselle.length; i++){
            this.caselle[i] =  arrayCaselle[i];
            if(this.caselle[i].tipoCasella=="proprieta"){
                var contratto = this.getContratto(caselle[i].nome);
                this.caselle[i]=new proprieta(this.caselle[i].nome,contratto) ;
            }
        }
    }

    getContratto(nome){

        for(let j = 1 ;j<=arrayContratti.length;j++){

            if(this.caselle[i].nome == arrayContratti[j].nome)
            
             return arrayContratti[j];

        }  

    }

    setCarteProb(){
        for(let i = 1;i<= arrayImprevisti.length; i++){
            this.carteImp[i] =  arrayImprevisti[i];
        }
        sattolo(carteProb);

    }
    setCarteImp(){
        for(let i = 1;i<= arrayProb.length; i++){
            this.carteProb[i] =  arrayProb[i];
        }
        sattolo(carteImp)
    }
}