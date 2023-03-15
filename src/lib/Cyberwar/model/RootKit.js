import { Card } from './Card';

export const kit_types = {
	EXTERNAL: 'external',
	CYBERNETIC: 'cybernetic'
};

export class RootKit {
	constructor(slots = 3, type = kit_types.EXTERNAL, cards = []) {
		this.slots = slots;
		this.type = type;
		this.cards = cards;
		this.previousCards = [{ round: 0, card: new Card() }];
		this.availableCards = cards; //.filter((c) => !this.previousCards.some((p) => p.card == c));
	}

	getHitPoints() {
		return this.slots * 3;
	}
	// 	getAvailableCards() {
	// 		return this.cards.filter((c) => !this.previousCards.some((p) => p.card == c));
	// 	}
}
