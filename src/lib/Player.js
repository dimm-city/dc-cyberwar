import { Deck } from "./Deck";

// Define a player class
export class Player {
    constructor(name) {
        this.name = name;
        this.hitPoints = 10;
        this.deck = new Deck();
        this.selectedCard = null;
    }

    getCardCount() {
        return this.deck.length;
    }

    playCard() {
        var result = this.selectedCard;
        this.selectedCard = null;
        return result;
    }
}