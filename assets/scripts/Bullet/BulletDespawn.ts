import { _decorator, Component, Node } from 'cc';
import { DespawnerByDistance } from '../Despawn/DespawnByDistance';
import { BulletSpawner } from '../Spawner/BulletSpawner';
const { ccclass, property } = _decorator;

@ccclass('BulletDespawn')
export class BulletDespawn extends DespawnerByDistance {
    onLoad() {
        super.onLoad();
    }

    start() {
        super.start();
    }

    update(deltaTime: number) {
        
    }

    //Override cách despawn
    despawnNode(): void {
        BulletSpawner.instance.despawnReStore(this.node.parent);
    }
}


