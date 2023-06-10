import { _decorator } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ItemDropInEnemy')
export class ItemDropInEnemy {
    private _itemName: string = "ItemDrop"; //Use Enum
    private _dropRate: number = 10;

    public get itemName() : string {
        return this.itemName;
    }

    public get dropRate(): number {
        return this.dropRate;
    }
}


