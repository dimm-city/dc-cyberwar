<script>
  import Card from "./Card.svelte";
  import { gameState } from "./Game";
</script>

<style>
  .player-hand {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .selected {
  color: red;
  }
</style>

<div class="player-hand">
  {#each $gameState.player.deck.cards as card, i}
    <div class:selected="{$gameState.player.selectedCard == card}">
      <Card card="{card}" />
    </div>
  {/each}
</div>
