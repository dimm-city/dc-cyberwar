<script>
  import { gameState } from "./model/Game";
</script>

<div class="container">
  <p>Please enter your name:</p>
  <input type="text" placeholder="Your name" bind:value="{$gameState.player.name}" />
  <button on:click="{gameState.startGame}">connect</button>
</div>
