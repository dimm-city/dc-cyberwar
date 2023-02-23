<script>
	import { gameState } from './model/Game';
	let winner = $gameState.player;

	if ($gameState.player.hitPoints <= 0 && $gameState.opponent.hitPoints > 0) {
		winner = $gameState.opponent;
	}
</script>

<style>
	.game-over {
		text-align: center;
		margin-top: 50px;
	}
	h2 {
		font-size: 3rem;
		margin-bottom: 20px;
	}
	.button-container {
		display: grid;
		grid-auto-flow: column;
		gap: 3rem;
	}
	button {
		font-size: clamp(0.8rem, 1.5rem, 1rem);
		white-space: nowrap;
		padding: 0.5rem 1rem;
	}
</style>

<div class="game-over">
	<h2>{winner.name} wins!</h2>
	<div class="button-container">
		<button data-augmented-ui class="aug-button" on:click={() => gameState.restart()}>Restart</button>
		<button data-augmented-ui class="aug-button" on:click={() => gameState.startNewGame()}>New Game</button>
	</div>

    <p>Restart to play against the same opponent or start a new game to root a different system.</p>
</div>
