import { writable, get } from 'svelte/store';
import { Card } from './Card';
import { GameState } from './GameState';
import cards from './cyberwar-cards.json';

export const states = {
	START_SCREEN: 'start_screen',
	SELECT_CARD: 'select_card',
	SHOW_CARDS: 'show_cards',
	END_TURN: 'end_turn',
	GAME_OVER: 'game_over'
};
// Define the game state
let availableCards = cards.map(
	(c) => new Card(c.slug, c.type, c.name, c.attack, c.defense, c.description)
);
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
	const state = get(gameStore);
	const player = state.player;
	const opponent = state.opponent;

	if (state.settings.maxRounds > 0 && state.currentRound == state.settings.maxRounds && opponent.hitPoints > 0) {
		gameStore.update((state) => {
			state.selectedCards.opponent = null;
			state.selectedCards.player = null;
      state.winner = state.opponent;
			return {
				...state,
				message: `${opponent.name} has successfully defended against the attack!`,
				currentState: states.GAME_OVER
			};
		});
	} else if (player.hitPoints <= 0 || opponent.hitPoints <= 0) {
		gameStore.update((state) => {
			state.selectedCards.opponent = null;
			state.selectedCards.player = null;
      state.winner = state.player.hitPoints <= 0 ? state.opponent : state.player;
			return {
				...state,
				message: `${state.winner.name} has successfully hacked the system!`,
				currentState: states.GAME_OVER
			};
		});
	} else {
		gameStore.update((state) => {
			state.selectedCards.opponent = null;
			state.selectedCards.player = null;
			state.currentState = states.SELECT_CARD;
			state.currentRound++;
			return state;
		});
	}
}

export const gameState = {
	subscribe: gameStore.subscribe,
	/**
   * @param {import("./Player").Player} player
   * @param {import("./ComputerPlayer").ComputerPlayer} opponent
   * @param {import("./GameSettings").GameSettings} settings
   */
	startGame(player, opponent, settings) {
		gameStore.update((state) => {
      state.settings = settings;
			state.currentRound = 1;
			state.player = player;
			state.opponent = opponent;
      state.player.selectedCard = null;
			state.opponent.selectedCard = null;
			state.currentState = states.SELECT_CARD;
			return state;
		});
	},
	async startNewGame() {
		gameStore.update((state) => {
			state.currentRound = 1;
      state.player.selectedCard = null;
			state.opponent.selectedCard = null;
			state.availableCards = availableCards;
			state.currentState = states.START_SCREEN;
			return state;
		});
	},
	/**
   * @param {any} card
   */
	selectCard(card) {
		gameStore.update((state) => {
			state.player.selectedCard = card == state.player.selectedCard ? null : card;

			return state;
		});
	},
	playTurn,
	nextRound,
	restart() {
		gameStore.update((state) => {
			state = new GameState(state.player, state.opponent, state.settings);
			state.player.resetHitPoints();
			state.player.selectedCard = null;
			state.opponent.selectedCard = null;
			state.player.resetHitPoints();
			state.opponent.resetHitPoints();
			state.currentState = states.SELECT_CARD;
			return state;
		});
	}
};
