import { Component, OnInit, HostListener } from '@angular/core';
//import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  playingGame:boolean = false;
  playingOthello:boolean = false;
  playingSnake:boolean = false;
  value = 0;

  constructor() { }

  ngOnInit() {
  }

  game(game:string){
    this.playingGame = !this.playingGame;
    if(game=="othello"){
      this.playingOthello = !this.playingOthello;
    } else if(game=="snake"){
      this.playingSnake = !this.playingSnake;
    }
  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);

    window.addEventListener("keydown", function(e) {
      // space and arrow keys
      if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
          e.preventDefault();
      }
  }, false);
  }

}
