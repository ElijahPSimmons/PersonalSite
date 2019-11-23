import { Card } from './card';

export class Deck {
    deck:Card[] = [];
    constructor(){
        let iter = 0;
        for(let i = 0; i < 13; i++){
            for(let j = 0; j < 4; j++){
                this.deck.push(new Card(i,j));
            }
        }
    }
}
