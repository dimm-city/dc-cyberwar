<script>
    import { gameState } from './Game';
    const cards = $gameState.opponent.deck.cards;
</script>

<div class="opponent-hand">
    {#each cards as card, i}
        <div class="card-back" />
    {/each}
</div>

<style>
    .opponent-hand {
        display: flex;
        justify-content: center;
    }

    .card-back {
        border: 1px solid black;
        border-radius: 5px;
        width: 100px;
        height: 150px;
        margin: 10px;
        background-color: #ccc;
    }
</style>
