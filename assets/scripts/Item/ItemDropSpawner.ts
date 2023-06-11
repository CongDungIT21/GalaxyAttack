import { _decorator, Component, Node, Prefab, Vec3 } from 'cc';
import { Spawner } from '../Spawner/Spawner';
const { ccclass, property } = _decorator;

@ccclass('ItemDropSpawner')
export class ItemDropSpawner extends Spawner {
    private static _instance: ItemDropSpawner;

    onLoad() {
        super.onLoad();
        if(!ItemDropSpawner._instance) 
            ItemDropSpawner._instance = this;
    }

    start() {
        super.start();
        this.loadSpawneds();
    }

    update(deltaTime: number) {
        
    }
 
    public static get instance() : ItemDropSpawner {
        if (!ItemDropSpawner._instance) {
            console.log("Chưa có intanse")
            ItemDropSpawner._instance = new ItemDropSpawner();
        }

        return ItemDropSpawner._instance;
    }
    
    public dropItem(item: Prefab, position: Vec3, angle: number) {
        // console.log("dropItem Call");
        let itemDrop = this.spawn(item.name, angle, position);
        itemDrop.active = true;
        // console.log("itemDrop", itemDrop);
        // console.log("hihi", this.getSpawnerable());
        // console.log("haha", this.getSpawnered());
    }
}


