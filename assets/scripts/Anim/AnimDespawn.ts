import { _decorator, Component, Node } from 'cc';
import { DespawnByTime } from '../Despawn/DespawnByTime';
import { AnimSpawner } from './AnimSpawner';
const { ccclass, property } = _decorator;

@ccclass('AnimDespawn')
export class AnimDespawn extends DespawnByTime {
    private parentNode: Node;

    onLoad() {
        super.onLoad();
        this.parentNode = this.node.parent;
    }

    start() {
        super.start();
    }

    update(deltaTime: number) {
        super.update(deltaTime);
    }

    //Override cách despawn
    despawnNode(): void {
        AnimSpawner.instance.despawnReStore(this.parentNode);
    }
}


