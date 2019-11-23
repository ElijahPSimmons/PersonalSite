export class Card {
    faceValues:string[] = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
    suitValues:string[] = ["spades","hearts","clubs","diamonds"];
    used:boolean = false;
    public value:string;
    public suit:string;
    img:string;
    constructor(value:number,suit:number){
        this.value = this.faceValues[value];
        this.suit = this.suitValues[suit];
        this.img = "../../../assets/playing-cards-assets-master/png/"+this.value+"_of_"+this.suit+".png";
    }

    setUsed(set:boolean){
        this.used = set;
    }

    getValue(){
        console.log(this.value)
    }
}
