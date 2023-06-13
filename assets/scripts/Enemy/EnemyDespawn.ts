import { _decorator, Component, Node } from 'cc';
import { DespawnByDead } from '../Despawn/DespawnByDead';
import { EnemySpawner } from './EnemySpawner';
const { ccclass, property } = _decorator;

@ccclass('EnemyDespawn')
export class EnemyDespawn extends DespawnByDead {
    onLoad() {
        super.onLoad();
    }

    start() {
        super.start();
    }

    //Override cách despawn
    despawnNode(): void {
        // console.log("EnemyDespawn")
        EnemySpawner.instance.despawnReStore(this.node.parent);
    }
}


