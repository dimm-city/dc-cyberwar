<script>
  import { gameState } from "./Game";
  import Card from "./Card.svelte";
  export let disabled;
</script>

<style>
  .game-controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
  }

  .selected {
    color: red;
  }

  .card-container {
    overflow-x: auto;
    width: 100vw;
  }
  .card-grid {
    display: flex;
    flex-wrap: nowrap;
    justify-content: start;
    gap: 1rem;
  }

  .card-cell {
    cursor: pointer;
    padding: 0.5rem;
    width: 12rem;
  }

  .card-cell.disabled {
    background-color: gray;
    cursor: not-allowed;
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

  /* Media query for smaller screens */
  @media (max-width: 600px) {
    .card-cell {
      width: 6rem;
    }
  }
</style>

<div class="game-controls">
  <div class="card-container">
    <div class="card-grid">
      {#each $gameState.player.deck.cards as card, index}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
          class="card-cell"
          class:disabled="{disabled}"
          class:selected="{card === $gameState.player.selectedCard}"
          on:click="{() => gameState.selectCard(card)}">
          <Card card="{card}" />
        </div>
      {/each}
    </div>
  </div>
  <button
    class="play-button"
    disabled="{disabled || $gameState.player.selectedCard == null}"
    on:click="{() => gameState.playTurn()}">
    Execute Script
  </button>
</div>
