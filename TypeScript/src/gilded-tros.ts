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
                case 'Good Wine':
                    this.updateGoodWine(item);
                    break;
                case 'Backstage passes for Re:Factor':
                case 'Backstage passes for HAXX':
                    this.updateBackstagePass(item);
                    break;
                default:
                    this.updateItem(item);
                    break;
            }
        }
    }

    private updateGoodWine(item: Item): void {
        let increment = 1;
        if (item.sellIn < 0) increment++;
        item.quality = Math.min(item.quality + increment, 50);
    }

    private updateBackstagePass(item: Item): void {
        if (item.sellIn < 0) {
            item.quality = 0;
            return;
        }

        let increment = 1;
        if (item.sellIn < 11) increment++;
        if (item.sellIn < 6) increment++;
        item.quality = Math.min(item.quality + increment, 50);
    }

    private updateItem(item: Item): void {
        const degrade = GildedTros.smellyItems.includes(item.name) ? 2 : 1;

        let totalDegrade = degrade;
        if (item.sellIn < 0) totalDegrade += degrade;
        item.quality = Math.max(item.quality - totalDegrade, 0);
    }
}
