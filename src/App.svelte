<script>
	import { onMount } from 'svelte';
	import { gameState } from './lib/Game.js';
	import StartScreen from './lib/StartScreen.svelte';
	import Game from './lib/Game.svelte';
	import GameOver from './lib/GameOver.svelte';
  
  </script>
  
  {#if $gameState.currentState === 'start'}
	<StartScreen />
  {:else if $gameState.currentState === 'game'}
	<Game />
  {:else if $gameState.currentState === 'gameOver'}
	<GameOver />
  {/if}
  