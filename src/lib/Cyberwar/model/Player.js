import { RootKit } from './RootKit';

// Define a player class
export class Player {
	/**
	 * @param {string} name
	 */
	constructor(name, rootKit = new RootKit()) {
		this.name = name ?? '';
		this.rootKit = rootKit;
		this.hitPoints = this.rootKit.getHitPoints();
		/**
		 * @type {import("./Card").Card | null | undefined}
		 */
		this.selectedCard = null;
	}

	playCard(state) {
		let result = this.selectedCard;
		this.rootKit.previousCards = this.rootKit.previousCards.filter(
			(c) => state.currentRound - c.round > state.settings.cooldownRounds
		);
		this.rootKit.previousCards.push({
			round: state.currentRound,
			card: result
		});
		this.rootKit.availableCards = this.rootKit.cards.filter(
			(c) => !this.rootKit.previousCards.some((p) => p.card == c)
		);


		this.selectedCard = null;
		return result;
	}
	resetHitPoints() {
		this.hitPoints = this.rootKit.getHitPoints();
	}
}
