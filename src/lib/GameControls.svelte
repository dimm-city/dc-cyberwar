<script>
  import { gameState } from "./model/Game";
  import PlayerHand from "./PlayerHand.svelte";
  export let disabled;
</script>

<style>
  .game-controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
  }

  .play-button {
    background-color: #4caf50;
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    font-size: 1.2rem;
    margin-top: 1rem;
    padding: 0.5rem 1rem;
  }

  .play-button[disabled] {
    background-color: gray;
    cursor: not-allowed;
  }
</style>

<PlayerHand disabled="{disabled}" />
<div class="game-controls">
  <button
    class="play-button"
    disabled="{disabled || $gameState.player.selectedCard == null}"
    on:click="{() => gameState.playTurn()}">
    execute Script
  </button>
</div>
