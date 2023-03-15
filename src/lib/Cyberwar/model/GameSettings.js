export class GameSettings {
	constructor() {
		this.maxRounds = 5;
		this.cooldownRounds = 1;
		this.opponentSettings =  null; //new ComputerPlayerSettings(); //availableCards);
		this.playerSettings = {
			name: "Player 1",
			numberOfSlots: 4
		}
	}
}
