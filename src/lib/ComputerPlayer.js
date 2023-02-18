import { Player } from "./Player";

// Define a computer player class
export class ComputerPlayer extends Player {
    constructor() {
        super('undefined');
        this.selectCardRandomly();
    }
    selectCardRandomly() {
        this.selectedCard = this.deck.cards.at(
            Math.floor(Math.random() * this.deck.length)
        );
    }
}
