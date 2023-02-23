import { writable, get } from "svelte/store";
import { Card } from "./Card";
import { GameState } from "./GameState";
import cards from "./cyberwar-cards.json";

export const states = {
  START_SCREEN: "start_screen",
  SELECT_CARD: "select_card",
  SHOW_CARDS: "show_cards",
  END_TURN: "end_turn",
  GAME_OVER: "game_over",
};
// Define the game state
let availableCards = cards.map(c => new Card(c.slug, c.type, c.name, c.attack, c.defense, c.description));
const initialState = new GameState(null, null);
initialState.availableCards = availableCards;
const gameStore = writable(initialState);

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
  startGame(player, opponent) {
    gameStore.update((state) => {
      state.player = player;
      state.opponent = opponent;
      state.currentState = states.SELECT_CARD;
      return state;
    });
  },
  async startNewGame() {
    gameStore.update((state) => {
      state.availableCards = availableCards;
      state.currentState = states.START_SCREEN;
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
      state.player.resetHitPoints();
      state.player.selectCard = null;
      state.opponent.resetHitPoints();
      state.currentState = states.SELECT_CARD;
      return state;
    });
  },
};
