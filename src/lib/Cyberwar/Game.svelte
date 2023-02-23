<script>
	import StartScreen from './StartScreen.svelte';
	import GameInfo from './GameInfo.svelte';
	import GameControls from './GameControls.svelte';
	import GameOver from './GameOver.svelte';
	import { gameState, states } from './model/Game';
	import ShowCards from './ShowCards.svelte';
	import PlayerHand from './PlayerHand.svelte';
</script>

<main>
	{#if $gameState.currentState !== states.START_SCREEN}
		<GameInfo />
		<div>
			<GameControls disabled={false} />
		</div>
	{/if}
	{#if $gameState.currentState === states.START_SCREEN}
		<StartScreen />
	{:else if $gameState.currentState === states.SELECT_CARD}
		<div>
			<PlayerHand disabled={false} />
		</div>
	{:else if $gameState.currentState === states.SHOW_CARDS}
		<div>
			<ShowCards />
		</div>
	{:else if $gameState.currentState === states.GAME_OVER}
		<GameOver />
	{/if}
</main>
