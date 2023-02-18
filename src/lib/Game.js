import { writable } from 'svelte/store';


class Card {
    constructor(id, name, attack, defense) {
        this.id = id;
        this.name = name;
        this.attack = attack;
        this.defense = defense;
    }
}

class Deck {
    constructor() {
        this.cards = [
            new Card(1, "Dragon", 5, 1),
            new Card(2, "Knight", 3, 3),
            new Card(3, "Goblin", 2, 2),
            new Card(4, "Archer", 4, 0),
            new Card(5, "Swordsman", 3, 5),
            new Card(6, "Warrior", 4, 4),
            new Card(7, "Spearman", 2, 5),
            new Card(8, "Assassin", 5, 2),
            new Card(9, "Thief", 1, 3),
            new Card(10, "Mage", 3, 1)
        ];
    }
}
// Define a player class
class Player {
    constructor(name) {
        this.name = name;
        this.hitPoints = 10;
        this.deck = new Deck();
    }

    getCardCount() {
        return this.deck.length;
    }

    playCard(index) {
        return this.deck.splice(index, 1)[0];
    }
}
class GameState {
    constructor(){
        this.player = new Player();
        this.opponent = new Player();
        this.currentRound = {
            playerCard: null,
            opponentCard: null,
            message: ''
        }
        this.message = '';
        this.gameOver = false;
    }
}

// Define the game state
export const gameState = writable(new GameState());

// Define a function to create a deck of random cards
function createDeck() {
    const deck = [];
    const count = Math.floor(Math.random() * 5) + 3; // Choose a random deck size between 3 and 7
    for (let i = 0; i < count; i++) {
        const card = cards[Math.floor(Math.random() * cards.length)];
        deck.push(card);
    }
    return deck;
}





// Define the play turn function
async function playTurn(player, computer) {
    // The computer always plays first
    const computerIndex = Math.floor(Math.random() * computer.getCardCount());
    const computerCard = computer.playCard(computerIndex);
    const playerIndex = await promptForIndex(player);
    const playerCard = player.playCard(playerIndex);

    if (playerCard.attack > computerCard.defense) {
        computer.hitPoints -= playerCard.attack - computerCard.defense;
    } else if (computerCard.attack > playerCard.defense) {
        player.hitPoints -= computerCard.attack - playerCard.defense;
    }

    if (player.hitPoints <= 0 || computer.hitPoints <= 0) {
        gameState.update(state => {
            return {
                ...state,
                message: `${player.hitPoints <= 0 ? 'Computer' : 'Player'} wins!`,
                gameOver: true
            };
        });
    }
}

// Define a function to prompt the user for a card index
async function promptForIndex(player) {
    return new Promise(resolve => {
        const indexList = player.deck.map((card, index) => `${index}: ${card.name}`).join('\n');
        const indexPrompt = `Enter index of card to play (0-${player.getCardCount() - 1}):\n${indexList}`;

        const index = prompt(indexPrompt);
        const indexNum = parseInt(index);

        if (isNaN(indexNum) || indexNum < 0 || indexNum >= player.getCardCount()) {
            alert('Invalid index');
        }
    });
}