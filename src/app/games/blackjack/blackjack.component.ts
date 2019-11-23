import { Component, OnInit } from '@angular/core';
import { Deck } from '../deck';
import { Card } from '../card';

@Component({
  selector: 'app-blackjack',
  templateUrl: './blackjack.component.html',
  styleUrls: ['./blackjack.component.css']
})


export class BlackjackComponent implements OnInit {

  deck: Deck;
  dealerShow: boolean = false;
  dealerHand: Card[] = [new Card(0, 0)];
  playerHand: Card[] = [];
  started: boolean = false;
  bust: boolean = false;
  dealerBust: boolean = false;
  gameDone: boolean = false;
  winnerName: string = '';
  reasonOfWin: string = '';

  dealerValue: number = 0;
  playerValue: number = 0;

  playerWinCounter: number = 0;
  dealerWinCounter: number = 0;

  rulesPageShown:boolean = false;

  constructor() { }

  ngOnInit() {
    this.deck = new Deck;
  }

  startGame() {
    this.started = true;
    let check = Math.floor(Math.random() * 52);
    this.deck.deck[check].used = true;
    this.dealerHand[0] = this.deck.deck[check];

    this.dealerValue = this.checkValue(this.dealerHand);

    let worked: boolean = false
    while (!worked) {
      check = Math.floor(Math.random() * 52);
      if (this.deck.deck[check].used == false) {
        this.deck.deck[check].used = true;
        this.dealerHand.push(this.deck.deck[check]);
        worked = true;
      }
    }

    worked = false
    // Creates a randomly generated number to get a card
    // that if there is a repeat card, it draws another.
    while (!worked) {
      check = Math.floor(Math.random() * 52);
      if (this.deck.deck[check].used == false) {
        this.deck.deck[check].used = true;
        this.playerHand[0] = this.deck.deck[check];
        worked = true;
      }
    }
    this.playerValue = this.checkValue(this.playerHand);

  }

  hitACard() {
    let check = Math.floor(Math.random() * 52);
    let worked: boolean = false
    // Creates a randomly generated number to get a card
    // that if there is a repeat card, it draws another.
    while (!worked) {
      check = Math.floor(Math.random() * 52);
      if (this.deck.deck[check].used == false) {
        this.deck.deck[check].used = true;
        this.playerHand.push(this.deck.deck[check]);
        worked = true;
      }
    }
    this.playerValue = this.checkValue(this.playerHand);
    if (this.playerValue > 21) {
      this.bust = true;
      this.dealerShow = true;
      this.dealerValue = this.checkValue(this.dealerHand);
      this.winCondition();
    }

  }

  checkValue(hand: Card[]) {
    let totalValue = 0;
    let aceCount = 0;
    for (let card of hand) {
      switch (card.value) {
        case "A":
          aceCount++;
          break;
        case "K":
          totalValue += 10;
          break;
        case "Q":
          totalValue += 10;
          break;
        case "J":
          totalValue += 10;
          break;
        default:
          totalValue += Number(card.value);
          break;
      }
    }
    let testCount = aceCount;
    while (aceCount > 0) {
      totalValue += 11;
      aceCount--;
    }
    if (totalValue > 21) {
      for (let i = 0; i < testCount; i++) {
        totalValue -= 10;
        if (totalValue <= 21) {
          break;
        }
      }
    }



    return totalValue;
  }


  stand() {
    this.dealerShow = true;

    if (!this.bust) {
      let check = Math.floor(Math.random() * 52);

      // This section is to ensure that we aren't already in the
      // clear after drawing two cards in the startGame() method
      this.dealerValue = this.checkValue(this.dealerHand);

      //These are needed in order to allow for the setInterval function to delay and have
      // the correct scope of all of the variables used.  Then it will call winCondition
      // which will update the game board in the cases where the loop would end.
      let self = this;
      self.deck = this.deck;
      self.dealerValue = this.dealerValue;
      self.dealerHand = this.dealerHand;
      self.dealerBust = this.dealerBust;
      self.checkValue = this.checkValue;
      self.winCondition = this.winCondition;

      // setInterval function to delay the action of the loop by 
      // 1500 / 100 = 1.5 second delay.
      let intervalId = setInterval(function () {
        // We need to check to start the value and see if we are good 
        // after only two cards.  Then we need to check if we are good
        // with the worked boolean.  If not, then draw another card.
        // Then we need to check again to see if it is within the rules
        // for the dealer to stop drawing.
        let worked = false;
        self.dealerValue = self.checkValue(self.dealerHand);
        if ((self.dealerValue >= 17 && self.dealerValue <= 21)) {
          worked = true;
          self.winCondition();
        }
        if (worked) {
          clearInterval(intervalId);
        }

        check = Math.floor(Math.random() * 52);

        if (self.deck.deck[check].used == false && !worked) {
          self.deck.deck[check].used = true;
          self.dealerHand.push(self.deck.deck[check]);

          self.dealerValue = self.checkValue(self.dealerHand);

          if ((self.dealerValue >= 17 && self.dealerValue <= 21)) {
            self.winCondition();
            worked = true;
          } else if (self.dealerValue > 21) {
            self.dealerBust = true;
            worked = true;
            self.winCondition();
          }
        }
        if (worked) {
          clearInterval(intervalId);
        }
      }, 1500);
    }

  }

  winCondition() {
    this.gameDone = true;
    if (this.bust) {
      this.winnerName = "Dealer";
      this.reasonOfWin = "Player Busted";
      this.dealerWinCounter++;
    } else if (this.dealerBust) {
      this.winnerName = "Player";
      this.reasonOfWin = "Dealer Busted";
      this.playerWinCounter++;
    } else if (this.playerValue < this.dealerValue) {
      this.winnerName = "Dealer";
      this.reasonOfWin = "Dealer got lucky";
      this.dealerWinCounter++;
    } else if (this.playerValue > this.dealerValue) {
      this.winnerName = "Player";
      this.reasonOfWin = "Player was skillful";
      this.playerWinCounter++;
    } else {
      this.winnerName = "It was a tie"
      this.reasonOfWin = "Welp, it was an even game";
    }
  }

  newGame() {
    this.deck = new Deck;
    this.dealerShow = false;
    this.dealerHand = [new Card(0, 0)];
    this.playerHand = [];
    this.started = false;
    this.bust = false;
    this.dealerBust = false;
    this.gameDone = false;
    this.winnerName = '';
    this.reasonOfWin = '';

    this.dealerValue = 0;
    this.playerValue = 0;
    this.startGame();
  }

}
