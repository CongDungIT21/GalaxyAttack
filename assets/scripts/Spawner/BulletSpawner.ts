import { _decorator, Component, Node } from 'cc';
import { Spawner } from './Spawner';
const { ccclass, property } = _decorator;

@ccclass('BulletSpawner')
export class BulletSpawner extends Spawner {
    private static _instance: BulletSpawner;

    onLoad() {
        super.onLoad();
        if(!BulletSpawner._instance) 
            BulletSpawner._instance = this;
    }

    start() {
        super.start();
        this.loadSpawneds();
    }

    update(deltaTime: number) {
        
    }
 
    public static get instance() : BulletSpawner {
        if (!BulletSpawner._instance) {
            console.log("Chưa có intanse")
            BulletSpawner._instance = new BulletSpawner();
        }

        return BulletSpawner._instance;
    }
    
}


