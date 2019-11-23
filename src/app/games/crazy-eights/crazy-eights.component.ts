import { Component, OnInit } from '@angular/core';
import { Deck } from '../deck';
import { Card } from '../card';

@Component({
  selector: 'app-crazy-eights',
  templateUrl: './crazy-eights.component.html',
  styleUrls: ['./crazy-eights.component.css']
})
export class CrazyEightsComponent implements OnInit {
  rulesPageShown: boolean = false;
  gameDone: boolean = false;
  started: boolean = false;
  wildEightPlayed: boolean = false;

  cardsUsed: number = 0;

  deck: Deck = new Deck;
  opponentHand: Card[] = [];
  playerHand: Card[] = [];
  cardInPlay: Card;


  constructor() { }

  ngOnInit() {
  }

  checkCard(suit:number){
    let card:Card = new Card(7,suit);
    this.playCard(card);
  }

  startGame() {
    this.started = true;
    let worked: number = 0;
    while (worked < 14) {
      let check = Math.floor(Math.random() * 52);
      if (this.deck.deck[check].used == true) {
        continue;
      } else if (worked % 2 == 0) {
        this.deck.deck[check].used = true;
        this.opponentHand.push(this.deck.deck[check]);
        this.cardsUsed++;
      } else {
        this.deck.deck[check].used = true;
        this.playerHand.push(this.deck.deck[check]);
        this.cardsUsed++;
      }
      worked++;
    }
    let firstCard: boolean = true;
    while (firstCard) {
      let check = Math.floor(Math.random() * 52);
      if (this.deck.deck[check].used == true) {
        continue;
      } else {
        this.deck.deck[check].used = true;
        this.cardInPlay = this.deck.deck[check];
        firstCard = false;
        this.cardsUsed++;
      }
    }
  }

  drawCard(hand: string) {
    if (hand == "Player") {
      for (let card of this.playerHand) {
        if (card.value == this.cardInPlay.value || card.suit == this.cardInPlay.suit || card.value == "8") {
          alert("There is a card you can play!");
          return;
        }
      }
    }
    if (this.cardsUsed >= 52) {
      alert("There are no more cards to draw from!");
      this.endGame("Tie");
      return;
    }
    let cardWorks: boolean = false;
    while (!cardWorks) {
      let check = Math.floor(Math.random() * 52);
      if (this.deck.deck[check].used == true) {
        continue;
      } else {
        this.deck.deck[check].used = true;
        if (hand == "Player") {
          this.playerHand.push(this.deck.deck[check]);
          this.cardsUsed++;
        } else if (hand == "Opponent") {
          this.opponentHand.push(this.deck.deck[check]);
          this.cardsUsed++;
        }
        if (this.deck.deck[check].value == this.cardInPlay.value || this.deck.deck[check].suit == this.cardInPlay.suit || this.deck.deck[check].value =="8") {
          cardWorks = true;
        }
        if (this.cardsUsed >= 52) {
          alert("There are no more cards to draw from!");
          this.endGame("Tie");
          return;
        }
      }
    }
  }

  playCard(card: Card, suit?: string) {
    if (card.value == this.cardInPlay.value || card.suit == this.cardInPlay.suit || card.value == "8") {
      if (card.value == "8" && !this.wildEightPlayed) {
        this.wildEightPlayed = true;
        this.playerHand = this.playerHand.filter(hand => hand != card);
        return;
      } else if (card.value == "8" && this.wildEightPlayed) {
        this.wildEightPlayed = false;
        this.cardInPlay = card;
      } else {
        this.cardInPlay = card;
        this.playerHand = this.playerHand.filter(hand => hand != card);
      }
    } else {
      alert("That isn't an approved move! Please try again.");
      return;
    }
    if (this.playerHand.length == 0) {
      this.endGame("Player");
      return;
    }
    this.opponentPlay();
  }

  opponentPlay() {
    let played: boolean = false;
    let checked: number = 0;
    while (!played && checked < this.opponentHand.length) {
      if (this.opponentHand[checked].value == this.cardInPlay.value || this.opponentHand[checked].suit == this.cardInPlay.suit || this.opponentHand[checked].value == "8") {
        played = true;
        this.cardInPlay = this.opponentHand[checked];
        this.opponentHand = this.opponentHand.filter(hand => hand != this.opponentHand[checked]);
      } else if(this.gameDone){
        return;
      }
      checked++;
    }
    if (this.opponentHand.length == 0) {
      this.endGame("Opponent");
    } else if (!played) {
      this.drawCard("Opponent");
      this.opponentPlay();
    }
  }

  endGame(winner: string) {
    alert("The winner is: " + winner);
    this.gameDone = true;
  }

  newGame() {
    this.rulesPageShown = false;
    this.gameDone = false;

    this.cardsUsed = 0;

    this.deck = new Deck;
    this.opponentHand = [];
    this.playerHand = [];
    this.cardInPlay = null;
    this.startGame();
  }

}
