<script>
  import Card from "./Card.svelte";
  import { gameState } from "./model/Game";
  export let disabled = false;
</script>

<style>
  .card-display-container {
    display: grid;
  }
  .card-display {
    display: grid;
    grid-auto-flow: column;
    gap: 2rem;
    width: min-content;
    justify-self: center;
  }
  .game-controls {
    display: flex;
    margin-top: 1rem;
    width: 100%;
    justify-content: center;
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
    width: 8rem;
  }

  .play-button[disabled] {
    background-color: gray;
    cursor: not-allowed;
  }
</style>

<div class="card-display-container">
  <div class="card-display">
    <Card card="{$gameState.selectedCards.opponent}" />
    <Card card="{$gameState.selectedCards.player}" />
  </div>
</div>
<div class="game-controls">
  <button
    disabled="{disabled}"
    class="play-button"
    on:click="{() => gameState.nextRound()}">
    continue
  </button>
</div>
