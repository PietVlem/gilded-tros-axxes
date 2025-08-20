import { Item } from './item';

export class GildedTros {
    constructor(public items: Array<Item>) { }

    public updateQuality(): void {
        const backstageReFactor = 'Backstage passes for Re:Factor'
        const backstageHaxx = 'Backstage passes for HAXX'
        const goodWine = 'Good Wine'
        const bDawgKeychain = 'B-DAWG Keychain'

        for (const item of this.items) {
            const { name } = item;

            if (name === bDawgKeychain) continue;

            item.sellIn--;

            switch (name) {
                case goodWine: {
                    this.updateGoodWine(item);
                    break;
                }
                case backstageReFactor:
                case backstageHaxx: {
                    this.updateBackstagePass(item);
                    break;
                }
                default: {
                    this.updateNormalItem(item);
                    break;
                }

            }
        }
    }

    private updateNormalItem(item: Item): void {
        if (item.quality > 0) item.quality--;
        if (item.sellIn < 0 && item.quality > 0) item.quality--;
    }

    private updateGoodWine(item: Item): void {
        if (item.quality < 50) item.quality++;
        if (item.sellIn < 0 && item.quality < 50) item.quality++;
    }

    private updateBackstagePass(item: Item): void {
        if (item.quality < 50) {
            item.quality++;
            if (item.sellIn < 11 && item.quality < 50) item.quality++;
            if (item.sellIn < 6 && item.quality < 50) item.quality++;
        }
        if (item.sellIn < 0) item.quality = 0;
    }
}
