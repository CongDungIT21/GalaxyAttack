import { _decorator, Component, Node } from 'cc';
import { ItemDropDespawn } from './ItemDropDespawn';
const { ccclass, property } = _decorator;

@ccclass('ItemDrop')
export class ItemDrop extends Component {
    @property(ItemDropDespawn)
    itemDropDespawn: ItemDropDespawn;

    start() {

    }

    despawnItem() {
        // console.log("itemDropDespawn")
        this.itemDropDespawn.isDespawn = true;
    }

    update(deltaTime: number) {
        
    }
}


