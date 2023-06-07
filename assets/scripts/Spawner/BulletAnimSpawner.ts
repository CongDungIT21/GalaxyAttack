import { _decorator, Component, Node } from 'cc';
import { Spawner } from './Spawner';
const { ccclass, property } = _decorator;

@ccclass('BulletAnimSpawner')
export class BulletAnimSpawner extends Spawner {
    private static _instance: BulletAnimSpawner;

    public static animBullet: string = "Bullet_Anim";
    public static animExplosion: string = "Explosion_Anim";

    onLoad() {
        super.onLoad();
        if(!BulletAnimSpawner._instance) 
            BulletAnimSpawner._instance = this;
    }

    start() {
        super.start();
        this.loadSpawneds();
    }

    update(deltaTime: number) {
        
    }
 
    public static get instance() : BulletAnimSpawner {
        if (!BulletAnimSpawner._instance) {
            console.log("Chưa có intanse BulletAnimSpawner")
            BulletAnimSpawner._instance = new BulletAnimSpawner();
        }

        return BulletAnimSpawner._instance;
    }
    
}


