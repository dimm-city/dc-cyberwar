<script>
	import { onMount } from 'svelte';
	import PlayerHand from './PlayerHand.svelte';
	import OpponentHand from './OpponentHand.svelte';
	import GameInfo from './GameInfo.svelte';
	import GameControls from './GameControls.svelte';
	import GameOver from './GameOver.svelte';
    import { gameState } from "./Game";
  
	onMount(async () => {
	//   const res = await fetch('/game');
	//   const data = await res.json();
	//   gameState.player.name = data.player.name;
	//   gameState.player.hand = data.player.hand;
	});
  
	function handlePlayCard() {
	  // TODO: implement play card logic
	}
  </script>
  
  <main>
	{#if $gameState.isGameOver}
	  <GameOver {gameState} />
	{:else}
	  <h1>DCC Hacking Terminal</h1>
	  <h2>Welcome, {$gameState.player.name}!</h2>
	  <PlayerHand {$gameState} />
	  <OpponentHand {$gameState} />
	  <GameInfo {$gameState} />
	  <GameControls on:play={handlePlayCard} />
	{/if}
  </main>
  