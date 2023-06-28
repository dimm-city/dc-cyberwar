<script>
	import { gameState } from './model/Game';
</script>

<style>
	.game-info {
		display: flex;
		justify-content: space-between;
		margin-bottom: 1rem;
	}

	.player-stats {
		font-size: 1.2rem;
		font-weight: bold;
	}

	.player-stats h3{
		margin-block: 0.2rem;
	}
	.player-details {
		display: flex;
		flex-direction: column;
		font-weight: normal;
		font-size: 0.8rem;
	}
</style>

<div class="game-info">
	<div class="player-stats">
		{$gameState.player.name} 
		<div class="player-details">
			<h3>hp: {$gameState.player.hitPoints} / {$gameState.player.rootKit.getHitPoints()}</h3>
			<span>kit type: {$gameState.player.rootKit.type}</span>
			<span>slots: {$gameState.player.rootKit.slots}</span>
			<span> <button tabindex="0" data-augmented-ui 
				on:click={() => gameState.startNewGame()}> quit </button></span>
		</div>
	</div>
<div>
	Current Round: {$gameState.currentRound} / {$gameState.settings.maxRounds}
</div>
	<div class="player-stats">
		{$gameState.opponent.name}
		<div class="player-details">
			<h3>hp: {$gameState.opponent.hitPoints} / {$gameState.opponent.rootKit.getHitPoints()}</h3>	
			<span>kit type: {$gameState.opponent.rootKit.type}</span>
			<span>slots: {$gameState.opponent.rootKit.slots}</span>		
		</div>
	</div>
	<!-- <div class="player-score">Your score: {playerScore}</div>
    <div class="computer-score">Computer score: {computerScore}</div> -->
</div>
