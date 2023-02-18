<script>
    import Card from './Card.svelte';
    import { gameState } from './Game';
  </script>
  
  <div class="player-hand">
    {#each $gameState.player.deck.cards as card, i}
      <Card {card} />
    {/each}
  </div>
  
  <style>
    .player-hand {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  </style>
  