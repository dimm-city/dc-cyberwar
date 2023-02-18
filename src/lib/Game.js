import { writable, get } from "svelte/store";
import { GameState } from "./GameState";

// Define the game state
const gameStore = writable(new GameState());

// Define the play turn function
async function playTurn() {
  const player = get(gameStore).player;
  const opponent = get(gameStore).opponent;
  const opponentCard = opponent.playCard();
  const playerCard = player.playCard();

  if (playerCard.attack > opponentCard.defense) {
    opponent.hitPoints -= playerCard.attack - opponentCard.defense;
  }
  if (opponentCard.attack > playerCard.defense) {
    player.hitPoints -= opponentCard.attack - playerCard.defense;
  }

  opponent.selectCardRandomly();

  if (player.hitPoints <= 0 || opponent.hitPoints <= 0) {
    gameStore.update((state) => {
      return {
        ...state,
        message: `${player.hitPoints <= 0 ? opponent.name : player.name} wins!`,
        currentState: "gameOver",
      };
    });
  } else {
    gameStore.update((state) => state);
  }

}

export const gameState = {
  subscribe: gameStore.subscribe,
  startGame() {
    gameStore.update((state) => {
      state.currentState = "game";
      return state;
    });
  },
  startNewGame() {
    gameStore.update((state) => {
      state = new GameState();
      return state;
    });
  },
  selectCard(card) {
    gameStore.update((state) => {
      state.player.selectedCard = card == state.player.selectedCard ? null : card;
      return state;
    });
  },
  playTurn() {
    playTurn();
  },
  restart() {
    gameStore.update((state) => {
      state = new GameState(state.player);
      state.currentState = "game";
      state.player.hitPoints = 10;
      return state;
    });
  },
};
