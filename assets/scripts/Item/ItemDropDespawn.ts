import { _decorator, Component, Node } from 'cc';
import { Despawner } from '../Despawn/Despawn';
import { ItemDropSpawner } from './ItemDropSpawner';
const { ccclass, property } = _decorator;

@ccclass('ItemDropDespawn')
export class ItemDropDespawn extends Despawner {
    private _isDespawn = false;

    onLoad(): void {
        super.onLoad();
        this._isDespawn = false;
    }

    despawnNode(): void {
        this._isDespawn = false;
        ItemDropSpawner.instance.despawnReStore(this.node.parent);
        // console.log("getSpawnered: ", ItemDropSpawner.instance.getSpawnered());
    }

    checkDespawnable(): boolean {
        return this._isDespawn;
    }

    
    public set isDespawn(v : boolean) {
        this._isDespawn = v;
    }
}


