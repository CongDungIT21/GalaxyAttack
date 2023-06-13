import { _decorator, Canvas, Component, director, EPhysics2DDrawFlags, instantiate, JsonAsset, Node, PhysicsSystem2D, Prefab, Vec3 } from 'cc';
import { Ship } from './Ship/Ship';
import { Enemy } from './Enemy/Enemy';
import { EnemySpawner } from './Enemy/EnemySpawner';
import { AudioManage } from './AudioManage';
import { UI_Start } from './UI/UI_Start';
import { UI_End } from './UI/UI_End';
import { DataEnemy, DataShip, EnemyName } from './GlobalVariable';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    @property(JsonAsset)
    config: JsonAsset
    @property(Ship)
    ship: Ship;
    @property(UI_Start)
    uiStart: UI_Start;
    @property(UI_End)
    uiEnd: UI_End;

    private static _instance: GameController;
    
    public static get instance() : GameController {
        if(!GameController._instance)
            GameController._instance = new GameController();

        return GameController._instance; 
    }

    public static waitingLoadData: boolean = false;

    private dataTmpEnemies: DataEnemy[];
    private isRender: boolean;
    private idxChallenge: number;
    private numberEnemies: number; // Số lượng enemy của màn chơi hiện tại
    private data: any;

    onLoad() {
        // PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.Aabb |
        // EPhysics2DDrawFlags.Pair |
        // EPhysics2DDrawFlags.CenterOfMass |
        // EPhysics2DDrawFlags.Joint |
        // EPhysics2DDrawFlags.Shape;

        GameController._instance = this;
        this.dataTmpEnemies = null;
        this.isRender = false;
        this.idxChallenge = 0;
        this.numberEnemies = null;
        this.data = this.config.json;
        //this.initGameData(this.data);
    }

    start() {        
        AudioManage.instance.background.play();
        // console.log("JSON Data", this.config.json);

        this.initGameData(this.data);
        GameController.waitingLoadData = true;
    }

    initGameData(data: any) {
        try {
            this.initShipSpace(data.Ship);    
            this.initEnemies(data.Challenges[this.idxChallenge]);        
        } catch (error) {
            console.log("JSON Error", error);
        }
    }

    initShipSpace(dataShipSpace: DataShip) {
        let startPos = new Vec3(dataShipSpace.StartPosition[0], dataShipSpace.StartPosition[1], 0);
        let endPos = new Vec3(dataShipSpace.EndPosition[0], dataShipSpace.EndPosition[1], 0);
        this.ship.startMoving(startPos, endPos);
    }

    initEnemies(dataEnemies: DataEnemy[]) {
        //Mỗi lần 1 con để đảm bảo preformance
        this.dataTmpEnemies = dataEnemies;
        this.isRender = true;

        this.numberEnemies = dataEnemies.length;
        // console.log("this.numberEnemies: ", this.numberEnemies);
        // dataEnemies.forEach(dataEnemy => this.initEnemy(dataEnemy));
    }

    initEnemy(dataEnemy: DataEnemy) {
        let nameEnemy : string = "";
        if(dataEnemy.EnemyType === 1) {
            nameEnemy = EnemyName.ENEMY1;
        }
        else if(dataEnemy.EnemyType === 2) {
                nameEnemy = EnemyName.ENEMY2;
        }
        else return;

        let startPos = new Vec3(dataEnemy.StartPosition[0], dataEnemy.StartPosition[1], 0);
        let endPos = new Vec3(dataEnemy.EndPosition[0], dataEnemy.EndPosition[1], 0);
        let enemy = EnemySpawner.instance.spawn(nameEnemy);
        enemy.active = true;
        enemy.getComponent(Enemy).startMoving(startPos, endPos);
        enemy.getComponent(Enemy).resertHP();
    }

    enemyDead() {
        // console.log("enemy dead");
        this.numberEnemies -= 1;
        if(this.numberEnemies === 0) 
        {
            console.error("this.data.Challenges[this.idxChallenge + 1]", this.data.Challenges[this.idxChallenge + 1])
            if(this.data.Challenges[this.idxChallenge + 1]) {
                console.error("hihi")
                this.idxChallenge += 1;
                this.initEnemies(this.data.Challenges[this.idxChallenge]);
            }
            else {
                console.error("Ship stateEndGame");
                this.ship.stateEndGame();              
            }
        }        
    }

    showEndGame() {
        // console.log("showEndGame");
        this.uiEnd.show();
    }

    rePlayGame() {
        this.idxChallenge = 0;
        // console.log("this.data: ", this.data)
        this.uiEnd.hide();
        this.ship.stateStartGame();
        this.initGameData(this.data);
    }


    update(dt: number) {
        if(this.dataTmpEnemies && this.isRender) {
            let tmpArrayLeft = this.dataTmpEnemies.slice(0, 7);
            tmpArrayLeft.forEach(dataEnemy => this.initEnemy(dataEnemy));

            this.dataTmpEnemies = this.dataTmpEnemies.slice(7);
            if(this.dataTmpEnemies.length <=0 ) 
                this.dataTmpEnemies = null;
        }
    }
}


