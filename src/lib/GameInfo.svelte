<script>
    import { gameState } from "./model/Game";
  </script>
  
  <div class="game-info">
    <div class="player-health">{$gameState.player.name} health: {$gameState.player.hitPoints}</div>
    <div class="computer-health">{$gameState.opponent.name} health: {$gameState.opponent.hitPoints}</div>
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
  