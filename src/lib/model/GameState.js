import { ComputerPlayer } from "./ComputerPlayer";
import { Player } from "./Player";

export class GameState {
    constructor(player = null, opponent = null) {
        this.player = player ?? new Player("Player 1");
        this.opponent = opponent ?? new ComputerPlayer();
        this.message = "";
        this.log = [];
        this.selectedCards = {
            player: null,
            opponent: null
        }
        this.currentState = "start_screen";
    }
}
