import { _decorator, Component, Node } from 'cc';
import { Spawner } from '../Spawner/Spawner';
const { ccclass, property } = _decorator;

@ccclass('AnimSpawner')
export class AnimSpawner extends Spawner {
    private static _instance: AnimSpawner;

    public static animBullet: string = "Bullet_Anim";
    public static animExplosion: string = "Explosion_Anim";

    onLoad() {
        super.onLoad();
        if(!AnimSpawner._instance) 
            AnimSpawner._instance = this;
    }

    start() {
        super.start();
        this.loadSpawneds();
    }

    update(deltaTime: number) {
        
    }
 
    public static get instance() : AnimSpawner {
        if (!AnimSpawner._instance) {
            console.log("Chưa có intanse AnimSpawner")
            AnimSpawner._instance = new AnimSpawner();
        }

        return AnimSpawner._instance;
    }
    
}


