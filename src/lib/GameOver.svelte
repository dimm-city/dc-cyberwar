<script>
    import { createEventDispatcher } from "svelte";
    const dispatcher = createEventDispatcher();
    export let winner;

    function restart() {
        // Dispatch a "restart" event to reset the game state
        dispatcher("restart");
    }
</script>

<div class="game-over">
    <h2>{winner.name} wins!</h2>
    <button on:click={restart}>Restart</button>
</div>

<style>
    .game-over {
        text-align: center;
        margin-top: 50px;
    }
    h2 {
        font-size: 3rem;
        margin-bottom: 20px;
    }
    button {
        padding: 10px 20px;
        font-size: 1.5rem;
        background-color: #4caf50;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.2s ease;
    }
    button:hover {
        background-color: #3e8e41;
    }
</style>
