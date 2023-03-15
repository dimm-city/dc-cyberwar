import { ComputerPlayerSettings } from "./ComputerPlayerSettings";

export class GameSettings {
	constructor() {
		this.maxRounds = 10;
		this.opponentSettings =  null; //new ComputerPlayerSettings(); //availableCards);
		this.playerSettings = {
			name: "Player 1",
			numberOfSlots: 4
		}
	}
}
