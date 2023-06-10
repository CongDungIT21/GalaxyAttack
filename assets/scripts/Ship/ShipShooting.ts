import { _decorator, Canvas, Component, director, instantiate, Node, Prefab } from 'cc';
import { Bullet } from '../Bullet/Bullet';
import { BulletSpawner } from '../Bullet/BulletSpawner';
const { ccclass, property } = _decorator;

@ccclass('ShipShooting')
export class ShipShooting extends Component {
    @property(Prefab)
    bulletPrefab: Prefab;

    private _isShooting: boolean;
    private canvas: Canvas;
    private timeDelay: number;
    private timeCounter: number;

    onLoad() {
        this.canvas = director.getScene().getComponentInChildren(Canvas);
        this._isShooting = false;
        this.timeDelay = 0.2; //speed shoot
        this.timeCounter = 0;
    }

    start() {

    }

    shooting(deltaTime: number) {        
        if(!this._isShooting) 
            return;
    
        this.timeCounter += deltaTime;  
        if(this.timeCounter >= this.timeDelay) {
            this.timeCounter = 0;
            let posInWorld = this.node.getWorldPosition();
            // let bullet = BulletSpawner.instance.spawn("Bullet", 90, posInWorld);
            // bullet.active = true;
            // bullet.getComponent(Bullet).init(90, 1000, posInWorld);
            // bullet.getComponent(Bullet).startFly();

            let angle = 90 - 5*9;
            for(let i=0;i<18;i++) {                
                let bullet = BulletSpawner.instance.spawn("Bullet", angle, posInWorld);
                bullet.active = true;
                bullet.getComponent(Bullet).init(angle, 1000, posInWorld);
                bullet.getComponent(Bullet).startFly();
                angle += 5;
            }
        }
        else 
            return;
    }

    update(deltaTime: number) {
        this.shooting(deltaTime);
    }
 
    public set isShooting(value: boolean) {
        this._isShooting = value;
    }
    
}


