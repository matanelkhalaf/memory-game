import { Component } from '@angular/core';
import { CardModal } from './card.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  //Cards
  cards: CardModal[] = [];

  //State
  gameStarted = false;
  score: number = 0;
  steps: number = 0;
  timer: number = 120;
  compare: string[] = [];

  //Hlpers
  timerInterval: any;

  startGame() {

    const  cardsToDuplicate_1 = [
     {
       answer: "Alef",
       image: "assets/Alef.png",
       flip: false,
       open: false
      },
      {
       answer: "AlefKamaz",
       image: "assets/AlefKamaz.png",
       flip: false,
       open: false
      },
      {
       answer: "Bet",
       image: "assets/Bet.png",
       flip: false,
       open: false
      },
      {
       answer: "BetKamaz",
       image: "assets/BetKamaz.png",
       flip: false,
       open: false
      },
      {
       answer: "Gimel",
       image: "assets/Gimel.png",
       flip: false,
       open: false
      },
      {
       answer: "GimelKamaz",
       image: "assets/GimelKamaz.png",
       flip: false,
       open: false
      },
    ];
    const  cardsToDuplicate_2 = [
     {
       answer: "Alef",
       image: "assets/Alef.png",
       flip: false,
       open: false
      },
      {
       answer: "AlefKamaz",
       image: "assets/AlefKamaz.png",
       flip: false,
       open: false
      },
      {
       answer: "Bet",
       image: "assets/Bet.png",
       flip: false,
       open: false
      },
      {
       answer: "BetKamaz",
       image: "assets/BetKamaz.png",
       flip: false,
       open: false
      },
      {
       answer: "Gimel",
       image: "assets/Gimel.png",
       flip: false,
       open: false
      },
      {
       answer: "GimelKamaz",
       image: "assets/GimelKamaz.png",
       flip: false,
       open: false
      },
    ];
    this.cards = [...cardsToDuplicate_1, ...cardsToDuplicate_2];
    this.shuffle();
    this.countDownTimer();
    this.gameStarted = true;
  }

  shuffle() {
    let counter = this.cards.length;

    while (counter > 0) {
      let index = Math.floor(Math.random() * counter);
      counter--;
      let temp = this.cards[counter];
      this.cards[counter] = this.cards[index];
      this.cards[index] = temp;
    }
  }

  countDownTimer() {
    this.timerInterval = setInterval(() => {
      --this.timer;
      if (this.timer === 0){
        clearInterval(this.timerInterval);
        this.gameStarted = false;
      }
    }, 1000)
  }

  checkCard(card: CardModal) {
    if (card.open || card.flip) return;

    card.flip = true;
    this.compare.push(card.answer);

    if (this.compare.length === 2) {
      let isCorrect: boolean = this.compare[0] === this.compare[1];

      setTimeout(() => {

        for (let cardItem of this.cards) {
           if(cardItem.flip) {
            cardItem.flip = isCorrect;
            cardItem.open = false;
          }
        }

        this.checkGameState();
        this.compare = [];
      }, 800)
      }
    }

    checkGameState() {
      ++this.steps;
      this.calcScore();
      this.checkIfgameOver();

    }

    calcScore() {
      const rating3Limit = (this.cards.length / 2) + 2,
      rating2Limit = this.cards.length,
      rating1Limit = (this.cards.length * 1.5);

      const is3Stars = this.steps <= rating3Limit,
      is2Stars = this.steps >= rating2Limit && this.steps < rating1Limit;

      this.score = is3Stars ? 3 : is2Stars ? 2 : 1;
    }

    checkIfgameOver(){
      const openedCatds =this.cards.filter((cardItem: CardModal) => cardItem.open).length;
      const cardsInBorad = this.cards.length;
      if  (openedCatds === cardsInBorad) {
        clearInterval(this.timerInterval) ;
        this.gameStarted = false;
      }
    }

  }

