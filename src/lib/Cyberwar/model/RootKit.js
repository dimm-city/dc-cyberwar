
export const kit_types = {
    EXTERNAL: "external",
    CYBERNETIC: "cybernetic"
  };

export class RootKit {
    constructor(slots = 3, type = kit_types.EXTERNAL, cards = []) {
        this.slots = slots;
        this.type = type;
        this.cards = cards;
    }
    getHitPoints() {
        return this.slots * 3;
    }
}
