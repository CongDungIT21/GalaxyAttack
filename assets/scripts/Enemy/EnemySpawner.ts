import { _decorator, Component, Node } from 'cc';
import { Spawner } from '../Spawner/Spawner';
const { ccclass, property } = _decorator;

@ccclass('EnemySpawner')
export class EnemySpawner extends Spawner {
    private static _instance: EnemySpawner;

    onLoad() {
        super.onLoad();
        if(!EnemySpawner._instance) 
            EnemySpawner._instance = this;
        this.loadSpawneds();
    }

    start() {
        super.start();       
    }
 
    public static get instance() : EnemySpawner {
        if (!EnemySpawner._instance) {
            console.log("Chưa có intanse")
            EnemySpawner._instance = new EnemySpawner();
        }

        return EnemySpawner._instance;
    }
    
}


