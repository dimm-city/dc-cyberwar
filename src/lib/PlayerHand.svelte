<script>
  import Card from "./Card.svelte";
  import { gameState } from "./model/Game";
  export let disabled;
</script>

<style>
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

  /* Media query for smaller screens */
  /* @media (max-width: 600px) {
    .card-cell {
      width: 6rem;
    }
  } */
</style>

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
