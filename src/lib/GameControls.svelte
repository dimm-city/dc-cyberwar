<script>
  import { gameState } from "./Game";

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
  .cards {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .card {
    background-color: white;
    border: 2px solid black;
    border-radius: 5px;
    cursor: pointer;
    padding: 0.5rem;
    width: 8rem;
  }

  .card.disabled {
    background-color: gray;
    cursor: not-allowed;
  }

  .card-title {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    text-align: center;
  }

  .card-attack,
  .card-defense {
    font-size: 1rem;
    margin-bottom: 0.5rem;
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

<h3>{$gameState.player.selectCard}</h3>
<div class="game-controls">
  <div class="cards">
    {#each $gameState.player.deck.cards as card, index}
      <div
        class="card"
        class:disabled="{disabled}"
        class:selected="{card === $gameState.player.selectedCard}"
        on:click="{() => gameState.selectCard(card)}">
        <div class="card-title">{card.name}</div>
        <div class="card-attack">Attack: {card.attack}</div>
        <div class="card-defense">Defense: {card.defense}</div>
      </div>
    {/each}
  </div>
  <button
    class="play-button"
    disabled="{disabled || $gameState.player.selectedCard == null}"
    on:click="{() => gameState.playTurn()}">Execute Script</button>
</div>
