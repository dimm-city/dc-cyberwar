// eslint-disable-next-line no-unused-vars
// @ts-ignore
import { Card } from './Card';
import { ComputerPlayerSettings } from './ComputerPlayerSettings';
import { Player } from './Player';
import { kit_types, RootKit } from './RootKit';
export class ComputerPlayer extends Player {
	
	/**
	 * 
	 * @param {string} name 
	 * @param {ComputerPlayerSettings} settings 
	 */
	constructor(name, settings = new ComputerPlayerSettings([])) {
		super(name ?? 'undefined');
		const kit = configureRootkit(settings);
		this.rootKit = kit;
		this.hitPoints = this.rootKit.getHitPoints();
		this.selectedCard = selectCardRandomly(this.rootKit.cards);
	}

	playCard(state) {
		this.selectedCard = selectCardRandomly(this.rootKit.availableCards);
		return super.playCard(state);
	}
}

/**
 * @param {ComputerPlayerSettings} settings
 */
function configureRootkit(settings) {
	const rand = Math.random();
	if (settings.type == kit_types.CYBERNETIC) {
		settings.maxSlots = 3;
	}

	settings.minSlots = settings.minSlots > settings.maxSlots ? settings.maxSlots : settings.minSlots;

	const slots = Math.floor(rand * (settings.maxSlots - settings.minSlots + 1)) + settings.minSlots;

	const kit = new RootKit(slots, settings.type);
	kit.cards = createRandomCards(
		settings.availableCards,
		slots,
		settings.minAttack,
		settings.maxAttack,
		settings.minDefense,
		settings.maxDefense
	);
	return kit;
}
/**
 * @param {Card[]} availableCards
 * @param {number} numOfSlots
 * @param {number} minAttack
 * @param {number} maxAttack
 * @param {number} minDefense
 * @param {number} maxDefense
 */
function createRandomCards(availableCards, numOfSlots, minAttack, maxAttack, minDefense, maxDefense) {
	/**
	 * @type {any[]}
	 */
	const cards = [];
	if (availableCards?.length === 0) return [];

	for (let i = 0; i < numOfSlots; i++) {
		let card;

		do {
			const attack = Math.floor(Math.random() * (maxAttack - minAttack + 1)) + minAttack;
			const defense = Math.floor(Math.random() * (maxDefense - minDefense + 1)) + minDefense;

			card = availableCards?.find(
				(/** @type {{ attack: any; defense: any; }} */ card) => card.attack === attack && card.defense === defense && !cards.includes(card)
			);
		} while (!card);

		cards.push(card);
	}

	return cards;
}

/**
 * @param {Card[]} cards
 */
function selectCardRandomly(cards) {
	const rand = Math.random();
	const possibleCards = cards.filter((/** @type { Card } */ c) => c.type != 'aug');
	return possibleCards.at(Math.floor(rand * possibleCards.length));
}
