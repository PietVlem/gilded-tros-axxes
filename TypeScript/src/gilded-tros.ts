import { Item } from './item';

export class GildedTros {
    constructor(public items: Array<Item>) { }

    public updateQuality(): void {
        const backstageReFactor = 'Backstage passes for Re:Factor'
        const backstageHaxx = 'Backstage passes for HAXX'
        const goodWine = 'Good Wine'
        const bDawgKeychain = 'B-DAWG Keychain'

        for (let i = 0; i < this.items.length; i++) {
            const { name, quality, sellIn } = this.items[i];

            if (![goodWine, backstageReFactor, backstageHaxx, bDawgKeychain].includes(name) && quality > 0) {
                this.items[i].quality--;
            } else {
                if (quality < 50) {
                    this.items[i].quality++;

                    if (name === backstageReFactor) {
                        if (sellIn < 11 && quality < 50) this.items[i].quality++;
                        if (sellIn < 6 && quality < 50) this.items[i].quality++;
                    }
                }
            }

            if (name !== bDawgKeychain) this.items[i].sellIn--;

            if (sellIn < 0) {
                if (name !== goodWine) {
                    if ([backstageReFactor, backstageHaxx].includes(name)) {
                        this.items[i].quality = 0;
                    } else if (quality > 0 && name !== bDawgKeychain) {
                        this.items[i].quality--;
                    }
                    continue;
                }

                if (quality < 50) this.items[i].quality++;
            }
        }
    }

}
