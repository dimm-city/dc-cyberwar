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
	const state = get(gameStore);
	const player = state.player;
	const opponent = state.opponent;

	const opponentCard = opponent.playCard(state);
	const playerCard = player.playCard(state);

	// player.rootKit.previousCards = player.rootKit.previousCards.filter(c => state.currentRound - c.round > state.settings.cooldownRounds);
	// player.rootKit.previousCards.push({
	// 	round: state.currentRound,
	// 	card: playerCard
	// });
	// player.rootKit.availableCards = player.rootKit.cards.filter((c) => !player.rootKit.previousCards.some((p) => p.card == c));

	// opponent.rootKit.previousCards = opponent.rootKit.previousCards.filter(c => state.currentRound - c.round > state.settings.cooldownRounds);
	// opponent.rootKit.previousCards.push({
	// 	round: state.currentRound,
	// 	card: opponentCard
	// });
	// opponent.rootKit.availableCards = opponent.rootKit.cards.filter((c) => !opponent.rootKit.previousCards.some((p) => p.card == c));

	if (playerCard.attack > opponentCard.defense) {
		const damage = playerCard.attack - opponentCard.defense;
		opponent.hitPoints -= damage;
		state.log.push({
			round: state.currentRound,
			message: `${player.name} attacks for ${damage} damage`
		});
	}
	if (opponentCard.attack > playerCard.defense) {
		const damage = opponentCard.attack - playerCard.defense;
		player.hitPoints -= damage;
		state.log.push({
			round: state.currentRound,
			message: `${opponent.name} deals ${damage} counterattack damage`
		});
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

	if (
		state.settings.maxRounds > 0 &&
		state.currentRound == state.settings.maxRounds &&
		opponent.hitPoints > 0
	) {
		gameStore.update((state) => {
			state.log.push({
				round: state.currentRound,
				message: `${opponent.name} has successfully defended against the attack!`
			});
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
			state.winner = state.player.hitPoints <= 0 ? state.opponent : state.player;
			state.log.push({
				round: state.currentRound,
				message: `${state.winner.name} has successfully hacked the system!`
			});
			state.selectedCards.opponent = null;
			state.selectedCards.player = null;
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
			state.player.rootKit.availableCards = state.player.rootKit.cards;
			state.opponent.rootKit.availableCards = state.opponent.rootKit.cards;
			state.currentState = states.SELECT_CARD;
			return state;
		});
	},
	async startNewGame() {
		gameStore.update((state) => {
			state.currentRound = 1;
			state.player.selectedCard = null;
			state.opponent.selectedCard = null;
			state.player.rootKit.availableCards = state.player.rootKit.cards;
			state.opponent.rootKit.availableCards = state.opponent.rootKit.cards;
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
			state.player.rootKit.availableCards = state.player.rootKit.cards;
			state.opponent.rootKit.availableCards = state.opponent.rootKit.cards;
			state.player.resetHitPoints();
			state.opponent.resetHitPoints();
			state.currentState = states.SELECT_CARD;
			return state;
		});
	}
};
