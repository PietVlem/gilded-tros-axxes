import { Item } from './item';

export class GildedTros {
    constructor(public items: Array<Item>) { }

    public updateQuality(): void {
        const backstageReFactor = 'Backstage passes for Re:Factor'
        const backstageHaxx = 'Backstage passes for HAXX'
        const goodWine = 'Good Wine'
        const bDawgKeychain = 'B-DAWG Keychain'

        for (let i = 0; i < this.items.length; i++) {
            if (![goodWine, backstageReFactor, backstageHaxx].includes(this.items[i].name)) {
                if (this.items[i].quality > 0) {
                    if (this.items[i].name !== bDawgKeychain) {
                        this.items[i].quality--;
                    }
                }
            } else {
                if (this.items[i].quality < 50) {
                    this.items[i].quality++;

                    if (this.items[i].name === backstageReFactor) {
                        if (this.items[i].sellIn < 11) {
                            if (this.items[i].quality < 50) {
                                this.items[i].quality++;
                            }
                        }

                        if (this.items[i].sellIn < 6) {
                            if (this.items[i].quality < 50) {
                                this.items[i].quality++;
                            }
                        }
                    }
                }
            }

            if (this.items[i].name !== bDawgKeychain) {
                this.items[i].sellIn--;
            }

            if (this.items[i].sellIn < 0) {
                if (this.items[i].name !== goodWine) {
                    if (this.items[i].name !== backstageReFactor || this.items[i].name !== backstageHaxx) {
                        if (this.items[i].quality > 0) {
                            if (this.items[i].name !== bDawgKeychain) {
                                this.items[i].quality--;
                            }
                        }
                    } else {
                        this.items[i].quality = 0;
                    }
                } else {
                    if (this.items[i].quality < 50) {
                        this.items[i].quality++;
                    }
                }
            }
        }
    }

}

