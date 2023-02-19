<script>
  import { Card } from "./model/Card";
  export let card = new Card();
</script>

<style>
  .card {
    aspect-ratio: 9/16;
    min-width: 10rem;
    max-width: 20rem;
    display: flex;
    background-color: #1c1c1c;
    background-image: url("/card-bg.png");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    overflow: hidden;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
    --aug-tl: 3px;

  }

  .card-content {
    display: grid;
    grid-template-rows: 7% 5% 73% 15%;
    color: #fff;
    text-shadow: 1px 1px #000;
    width: 100%;
  }

  .card-title {
    font-size: 1rem;
    font-weight: bold;
    text-align: center;
    align-self: center;
  }

  .card-type {
    font-size: 0.75rem;
    text-align: center;
    align-self: center;
  }

  .card-description {
    font-size: 0.8rem;
    color: #ccc;
    overflow-y: hidden;
    padding: 0.5rem;
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    background-color: #1c1c1c;
    background-image: linear-gradient(to bottom, #2b033dc4, #0e0020);
  }

  .card-footer span {
    font-size: 1.1rem;
    padding-inline: 0.75rem;
    font-weight: bold;
    color: #fff;
    text-shadow: 1px 1px #000;
    align-self: center;
    --aug-all-height: 2rem;
    --aug-border-all: 1px;
  }
</style>

<div class="card" data-augmented-ui="br-clip bl-clip tr-clip tl-2-clip-x" style="background-image: url('/assets/{card.type}-card-bg.png');">
  <div class="card-content">
    <div class="card-title" data-augmented-ui="">
      {card.name}
    </div>
    <div class="card-type" data-augmented-ui="">{card.type}</div>
    <div class="card-description" data-augmented-ui="">
      {card.description}
    </div>
    <div class="card-footer">
      <span data-augmented-ui="">ATK: {card.attack}</span>
      <span data-augmented-ui="">DEF: {card.defense}</span>
    </div>
  </div>
</div>
