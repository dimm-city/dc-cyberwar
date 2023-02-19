import { writable, get } from "svelte/store";
import { ComputerPlayer } from "./ComputerPlayer";
import { GameState } from "./GameState";
import { Player } from "./Player";

export const states = {
  START_SCREEN: "start_screen",
  SELECT_CARD: "select_card",
  SHOW_CARDS: "show_cards",
  END_TURN: "end_turn",
  GAME_OVER: "game_over",
};
// Define the game state
const gameStore = writable(new GameState(new Player(), new ComputerPlayer()));

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

  gameStore.update((state) => {
    state.currentState = states.SHOW_CARDS;
    state.selectedCards.opponent = opponentCard;
    state.selectedCards.player = playerCard;
    return state;
  });
}

async function nextRound() {
  const player = get(gameStore).player;
  const opponent = get(gameStore).opponent;

  if (player.hitPoints <= 0 || opponent.hitPoints <= 0) {
    gameStore.update((state) => {
      state.selectedCards.opponent = null;
      state.selectedCards.player = null;
      return {
        ...state,
        message: `${player.hitPoints <= 0 ? opponent.name : player.name} wins!`,
        currentState: states.GAME_OVER,
      };
    });
  } else {
    gameStore.update((state) => {
      state.selectedCards.opponent = null;
      state.selectedCards.player = null;
      state.currentState = states.SELECT_CARD;
      return state;
    });
  }
}

export const gameState = {
  subscribe: gameStore.subscribe,
  startGame() {
    gameStore.update((state) => {
      state.currentState = states.SELECT_CARD;
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
      state.player.selectedCard =
        card == state.player.selectedCard ? null : card;

      return state;
    });
  },
  playTurn,
  nextRound,
  restart() {
    gameStore.update((state) => {
      state = new GameState(state.player, state.opponent);
      state.currentState = states.SELECT_CARD;
      state.player.hitPoints = 10;
      state.opponent.hitPoints = 10;
      return state;
    });
  },
};
