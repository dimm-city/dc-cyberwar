<script>
    export let card = { attack: 0, defense: 0 };
  </script>
  
  <div class="card">
    <div class="attack">A: {card.attack}</div>
    <div class="defense">D: {card.defense}</div>
  </div>
  
  <style>
    .card {
      border: 1px solid black;
      border-radius: 5px;
      width: 100px;
      height: 150px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 10px;
    }
  
    .attack {
      font-weight: bold;
      font-size: 24px;
      margin-bottom: 10px;
    }
  
    .defense {
      font-size: 18px;
    }
  </style>
  