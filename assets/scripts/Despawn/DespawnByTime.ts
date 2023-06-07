import { _decorator, Component, Node } from 'cc';
import { Despawner } from './Despawn';
const { ccclass, property } = _decorator;

@ccclass('DespawnByTime')
export class DespawnByTime extends Despawner {
    despawnNode(): void {
        throw new Error('Method not implemented.');
    }
    private timeDelay: number;
    private timeCouter: number;
    private isDespawn: boolean;

    onLoad() {
        super.onLoad();
        this.timeDelay = 2;
        this.timeCouter = 0;
        this.isDespawn = false;
    }

    start() {
        super.start();
    }

    onEnable() {
        this.resetTime();
        this.isDespawn = false;   
    }

    update(deltaTime: number) {
        this.timeCouter += deltaTime;
        if(this.timeCouter > this.timeDelay) {
            this.isDespawn = true;
            this.timeCouter = 0;
        }
    }

    resetTime() {
        this.timeCouter = 0;
    }

    checkDespawnable(): boolean {
        return this.isDespawn;
    }
}


