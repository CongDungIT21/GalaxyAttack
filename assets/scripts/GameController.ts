import { _decorator, Canvas, Component, director, instantiate, JsonAsset, Node, Prefab, Vec3 } from 'cc';
import { Ship } from './Ship/Ship';
import { Enemy } from './Enemy/Enemy';
import { EnemySpawner } from './Enemy/EnemySpawner';
import { AudioManage } from './AudioManage';
const { ccclass, property } = _decorator;

interface DataShip {
    readonly StartPosition: [number, number],
    readonly EndPosition: [number, number]
}

interface DataEnemy {
    readonly EnemyType: number,
    readonly StartPosition: [number, number],
    readonly EndPosition: [number, number]
}

@ccclass('GameController')
export class GameController extends Component {
    @property(JsonAsset)
    config: JsonAsset
    @property(Ship)
    ship: Ship;
    @property(Prefab)
    prefabEnemies: Prefab[] = [];

    start() {
        AudioManage.instance.background.play();
        console.log("JSON Data", this.config.json);
        this.initChallenge(this.config.json);
    }

    initChallenge(data: any) {
        try {
            this.initEnemies(data.Challenges[0]);
            this.initShipSpace(data.Ship);            
        } catch (error) {
            console.log("JSON Error", error);
        }
    }

    initShipSpace(dataShipSpace: DataShip) {
        //console.log('dataShipSpace', dataShipSpace)
        let startPos = new Vec3(dataShipSpace.StartPosition[0], dataShipSpace.StartPosition[1], 0);
        let endPos = new Vec3(dataShipSpace.EndPosition[0], dataShipSpace.EndPosition[1], 0);
        this.ship.startMoving(startPos, endPos);
    }

    initEnemies(dataEnemies: DataEnemy[]) {
        //console.log('dataEnemies', dataEnemies)
        let i = 1;
        dataEnemies.forEach(dataEnemy => {
            let nameEnemy = "";
            if(dataEnemy.EnemyType === 1) {
                nameEnemy = "Enemy_1";
            }
            let startPos = new Vec3(dataEnemy.StartPosition[0], dataEnemy.StartPosition[1], 0);
            let endPos = new Vec3(dataEnemy.EndPosition[0], dataEnemy.EndPosition[1], 0);
            let enemy = EnemySpawner.instance.spawn(nameEnemy);
            enemy.active = true;
            // console.log("EnemySpawn: ", enemy);
            enemy.getComponent(Enemy).startMoving(startPos, endPos);
            enemy.setPosition(endPos);
            // console.log(i++);            
        })
    }

    update(deltaTime: number) {
        
    }
}


