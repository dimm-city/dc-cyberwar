import { Player } from "./Player";

export class ComputerPlayer extends Player {
    constructor(name) {
        super(name ?? 'undefined');
        this.selectCardRandomly();
    }
    selectCardRandomly() {
        const rand = Math.random();
        const possibleCards = this.deck.cards.filter(c => c.type != "aug");
        this.selectedCard = possibleCards.at(
            Math.floor(rand * possibleCards.length)
        );
    }
    playCard(){
        this.selectCardRandomly();
        return super.playCard();
    }
}
