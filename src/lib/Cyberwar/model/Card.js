// Define the possible cards

export class Card {
    /**
     * @param {string} [slug]
     * @param {string} [type]
     * @param {string} [name]
     * @param {number} [attack]
     * @param {number} [defense]
     */
    constructor(slug, type, name, attack, defense, description = "") {
        this.slug = slug;
        this.name = name;
        this.type = type;
        this.kitType = "any";
        this.attack = attack;
        this.defense = defense;
        this.description = description;
    }
}



