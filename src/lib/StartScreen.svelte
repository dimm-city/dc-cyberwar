<script>
  import { gameState } from "./Game";
</script>

<div class="container">
  <h1>Welcome to the DCC Hacking Terminal!</h1>
  <p>Please enter your name:</p>
  <input type="text" placeholder="Your name" bind:value="{$gameState.player.name}" />
  <button on:click="{gameState.startGame}">Start Game</button>
</div>
