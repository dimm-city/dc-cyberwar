import { kit_types } from "./RootKit";

export class ComputerPlayerSettings {
    constructor(
        availableCards = [],
        minSlots = 1,
        maxSlots = 3, //7
        type = kit_types.EXTERNAL,
        minAttack = 0,
        maxAttack = 3,
        minDefense = 0,
        maxDefense = 3
    ) {
        this.availableCards = availableCards;
        this.minSlots = minSlots;
        this.maxSlots = maxSlots;
        this.type = type;
        this.minAttack = minAttack;
        this.maxAttack = maxAttack;
        this.minDefense = minDefense;
        this.maxDefense = maxDefense;
    }
}
