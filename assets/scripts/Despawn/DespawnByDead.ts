import { _decorator, Component, Node } from 'cc';
import { Despawner } from './Despawn';
import { DamageReceive } from '../Damage/DamageReceive';
const { ccclass, property } = _decorator;

@ccclass('DespawnByDead')
export class DespawnByDead extends Despawner {  
    private damageReceive: DamageReceive;

    onLoad() {
        super.onLoad();
        this.damageReceive = this.node.parent.getComponentInChildren(DamageReceive);
    }

    start() {
        super.start();
    }

    update(deltaTime: number) {
        
    }

    //override
    despawnNode(): void {
        // console.log("despawnNode");
        // this.node.parent.destroy();
    }

    checkDespawnable(): boolean {
        // console.log("checkDespawnable()", this.damageReceive.isDead())
        return this.damageReceive.isDead();
    }
}


