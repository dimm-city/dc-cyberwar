import { RootKit } from './RootKit';

// Define a player class
export class Player {
	constructor(name, rootKit = new RootKit()) {
		this.name = name ?? '';
		this.rootKit = rootKit;
		this.hitPoints = this.rootKit.getHitPoints();
		this.selectedCard = null;
	}

	playCard() {
		var result = this.selectedCard;
		//this.selectedCard = null;
		return result;
	}
	resetHitPoints() {
		this.hitPoints = this.rootKit.getHitPoints();
	}
}
