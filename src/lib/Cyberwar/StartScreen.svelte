<script>
	import { gameState } from './model/Game';
	import { ComputerPlayer } from './model/ComputerPlayer';
	import { kit_types, RootKit } from './model/RootKit';
	import { ComputerPlayerSettings } from './model/ComputerPlayerSettings';
	import { Player } from './model/Player';
	import CardSelector from './CardSelector.svelte';
	import { GameSettings } from './model/GameSettings';

	let view = 'start';

	let gameSettings = $gameState.settings ?? new GameSettings();
	gameSettings.opponentSettings =
		gameSettings.opponentSettings ?? new ComputerPlayerSettings($gameState.availableCards);

	let playersKit = $gameState.player?.rootKit ?? new RootKit(4, kit_types.EXTERNAL, []);

	let player = $gameState.player ?? new Player('Player 1', playersKit);
	let opponent = $gameState.opponent ?? new ComputerPlayer('root', gameSettings.opponentSettings);

	function start() {
		if (playersKit.cards?.length === 0)
			playersKit.cards = $gameState.availableCards
				.sort((a, b) => Math.random() - 0.5)
				.slice(0, playersKit.slots);

		player.rootKit = playersKit;
		player.hitPoints = playersKit.getHitPoints();
		opponent = new ComputerPlayer(opponent.name, gameSettings.opponentSettings);
		gameState.startGame(player, opponent, gameSettings);
	}
</script>

{#if view == 'start'}
	<div class="start-container">
		<h4>Please enter your name:</h4>
		<label for="player-name">Name</label>
		<input
			data-augmented-ui
			class="aug-input"
			type="text"
			placeholder="Your name"
			bind:value={player.name}
		/>
		<label for="player-slots">RootKit slots</label>
		<input
			data-augmented-ui
			class="aug-input"
			type="text"
			placeholder="Slots"
			bind:value={player.rootKit.slots}
		/>
		<button data-augmented-ui class="aug-button" on:click={() => (view = 'settings')}
			>configure kit</button
		>
		<hr />
		<h4>Opponent: {opponent?.name}</h4>
		<!-- <RangeSlider range pushy values={[opponentSettings.minSlots,opponentSettings.maxSlots]} /> -->
		<label for="max-slots">Max RootKit slots</label>
		<input
			data-augmented-ui
			class="aug-input"
			type="text"
			placeholder="Max Slots"
			bind:value={gameSettings.opponentSettings.maxSlots}
		/>
		<label for="max-atk">Max Attack</label>
		<input
			data-augmented-ui
			class="aug-input"
			type="text"
			placeholder="Max Attack"
			bind:value={gameSettings.opponentSettings.maxAttack}
		/>
		<label for="max-def">Max Defense</label>
		<input
			data-augmented-ui
			class="aug-input"
			type="text"
			placeholder="Max Defense"
			bind:value={gameSettings.opponentSettings.maxDefense}
		/>
		<hr />
		<h4>Hacking Parameters</h4>
		<label for="max-def">Max Number of Rounds</label>
		<input
			data-augmented-ui
			class="aug-input"
			type="text"
			placeholder="Max Number of Rounds"
			bind:value={gameSettings.maxRounds}
		/>
		<button data-augmented-ui class="aug-button" on:click={() => start()}>connect</button>
	</div>
{:else}
	<div class="config-container">
		<button data-augmented-ui class="aug-button" on:click={() => (view = 'start')}>confirm</button>
		<CardSelector
			maxCards={player.rootKit.slots}
			availableCards={$gameState.availableCards}
			bind:selectedCards={player.rootKit.cards}
		/>
	</div>
{/if}

<style>
	.start-container,
	.config-container {
		display: grid;
		gap: 1rem;
	}
	label {
		font-size: 0.9rem;
	}
	button {
		font-size: 1.5rem;
		padding: 0.5rem 1rem;
	}
	hr {
		width: 100%;
	}
</style>
