import { ComputerPlayer } from './ComputerPlayer';
import { Player } from './Player';

export class GameState {
	constructor(player = null, opponent = null) {
		this.player = player ?? new Player('Player 1');
		this.opponent = opponent ?? new ComputerPlayer('root');
		this.message = '';
		this.log = [{ round: 0, message: 'Starting new game...' }];
		this.availableCards = [];
		this.selectedCards = {
			player: null,
			opponent: null
		};
		this.currentState = 'start_screen';
	}
}
