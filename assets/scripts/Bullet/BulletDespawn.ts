import { _decorator, Component, Node } from 'cc';
import { DespawnerByDistance } from '../Despawn/DespawnByDistance';
import { BulletSpawner } from './BulletSpawner';
const { ccclass, property } = _decorator;

@ccclass('BulletDespawn')
export class BulletDespawn extends DespawnerByDistance {
    onLoad() {
        super.onLoad();
    }

    start() {
        super.start();
    }

    //Override cách despawn
    despawnNode(): void {
        BulletSpawner.instance.despawnReStore(this.node.parent);
    }
}


