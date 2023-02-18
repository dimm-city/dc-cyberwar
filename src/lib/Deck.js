import { Card } from "./Card";

export class Deck {
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
            new Card(10, "Mage", 3, 1),
        ];
    }
}
