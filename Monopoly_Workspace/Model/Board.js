var cs = require("cs");
var contents = cs.readFileSync("Caselle.json");
var arrayCaselle = JSON.parse(contents);
var arrayImprevisti = require("/public/informazioniBoard/Imprevisti.json");
var arrayProb = require("/public/informazioniBoard/Probabilita.json");


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
        }
    }

    setCarteProb(){
        for(let i = 1;i<= arrayImprevisti.length; i++){
            this.carteImp[i] =  arrayImprevisti[i];
        }

    }
    setCarteImp(){
        for(let i = 1;i<= arrayProb.length; i++){
            this.carteProb[i] =  arrayProb[i];
        }
    }
}