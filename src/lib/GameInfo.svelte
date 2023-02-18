<script>
    import { gameState } from "./Game";
    import Game from "./Game.svelte";
  </script>
  
  <div class="game-info">
    <div class="player-health">Your health: {$gameState.player.hitPoints}</div>
    <div class="computer-health">Computer health: {$gameState.opponent.hitPoints}</div>
    <!-- <div class="player-score">Your score: {playerScore}</div>
    <div class="computer-score">Computer score: {computerScore}</div> -->
  </div>
  
  <style>
    .game-info {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
    }
  
    .player-health, .computer-health {
      font-size: 1.2rem;
      font-weight: bold;
    }
  
    .player-score, .computer-score {
      font-size: 1.2rem;
      font-weight: bold;
    }
  </style>
  