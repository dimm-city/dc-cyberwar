import { ComputerPlayer } from './ComputerPlayer';
import { Player } from './Player';
import { GameSettings } from './GameSettings';

export class GameState {
	/**
	 * @param {import("./Player").Player | null} [player]
	 * @param {import("./Player").Player | null} [opponent]
	 * @param {import("./GameSettings").GameSettings | null} [settings]
	 */
	constructor(player = null, opponent = null, settings = null) {
		this.settings = settings ?? new GameSettings();

		/**
		 * @type {import("./Player").Player}
		 */
		this.player = player ?? new Player('Player 1');
		this.opponent = opponent ?? new ComputerPlayer('root');
		this.message = '';
		this.log = [{ round: 0, message: 'Starting new game...' }];

		/**
		 * @type {import("./Card").Card[]}
		 */
		this.availableCards = [];
		this.selectedCards = {
			player: null,
			opponent: null
		};
		this.currentState = 'start_screen';
		this.currentRound = 1;
		/**
		 * @type {Player | null}
		 */
		this.winner = null;
	}
}
