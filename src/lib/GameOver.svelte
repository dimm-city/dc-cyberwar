<script>
    import { gameState } from "./model/Game";
    let winner = $gameState.player;

    if($gameState.player.hitPoints <= 0 && $gameState.opponent.hitPoints > 0){
        winner = $gameState.opponent;
    }

  </script>

<div class="game-over">
    <h2>{winner.name} wins!</h2>
    <button on:click={() => gameState.restart()}>Restart</button>
    <button on:click={() => gameState.startNewGame()}>New Game</button>
</div>

<style>
    .game-over {
        text-align: center;
        margin-top: 50px;
    }
    h2 {
        font-size: 3rem;
        margin-bottom: 20px;
    }
    button {
        padding: 10px 20px;
        font-size: 1.5rem;
        background-color: #4caf50;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.2s ease;
    }
    button:hover {
        background-color: #3e8e41;
    }
</style>
