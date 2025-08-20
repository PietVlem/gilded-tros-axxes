import { Item } from './item';

export class GildedTros {
    private static readonly smellyItems = ["Duplicate Code", "Long Methods", "Ugly Variable Names"]

    constructor(public items: Array<Item>) { }

    public updateQuality(): void {
        for (const item of this.items) {
            const { name } = item;

            if (name === 'B-DAWG Keychain') continue;

            item.sellIn--;

            switch (name) {
                case 'Good Wine': {
                    this.updateGoodWine(item);
                    break;
                }
                case 'Backstage passes for Re:Factor':
                case 'Backstage passes for HAXX': {
                    this.updateBackstagePass(item);
                    break;
                }
                default: {
                    this.updateItem(item);
                    break;
                }
            }
        }
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

    private updateItem(item: Item): void {
        const degrade = GildedTros.smellyItems.includes(item.name) ? 2 : 1;

        if (item.quality > 0) item.quality -= degrade;
        if (item.sellIn < 0 && item.quality > 0) item.quality -= degrade;
    }
}
