<script>
  import StartScreen from "./StartScreen.svelte";
  import GameInfo from "./GameInfo.svelte";
  import GameControls from "./GameControls.svelte";
  import GameOver from "./GameOver.svelte";
  import { gameState, states } from "./model/Game";
  import ShowCards from "./ShowCards.svelte";
</script>

<main>
  <h1>DCC Rooting Terminal v0.0.1</h1>
  {#if $gameState.currentState !== states.START_SCREEN}
    <GameInfo />
  {/if}
  {#if $gameState.currentState === states.START_SCREEN}
    <StartScreen />
  {:else if $gameState.currentState === states.SELECT_CARD}
    <div>
      <GameControls />
    </div>
  {:else if $gameState.currentState === states.SHOW_CARDS}
    <div>
		<ShowCards />
	</div>
  {:else if $gameState.currentState === states.GAME_OVER}
    <GameOver />
  {/if}
</main>
