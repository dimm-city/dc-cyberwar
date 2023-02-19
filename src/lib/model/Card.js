// Define the possible cards

export class Card {
    constructor(id, type, name, attack, defense, description = "") {
        this.id = id;
        this.name = name;
        this.type = type;
        this.attack = attack;
        this.defense = defense;
        this.description = description;
    }
}
