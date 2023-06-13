import { _decorator, Canvas, Component, director, instantiate, Node, Prefab, UITransform, Vec3 } from 'cc';
import { Bullet } from '../Bullet/Bullet';
import { BulletSpawner } from '../Bullet/BulletSpawner';
import { AudioManage } from '../AudioManage';
import { GameController } from '../GameController';
const { ccclass, property } = _decorator;

@ccclass('ShipShooting')
export class ShipShooting extends Component {
    @property(Prefab)
    bulletPrefab: Prefab;

    private _isShooting: boolean;
    private canvas: Canvas;
    private timeShooting: number;  // Thời gian bắn cách nhau của những  viên đạn
    private barrelShooting: number; // Số nòng súng
    private timeCounter: number;
    private speedBullet: number;
    private startShootingPos: Vec3;

    onLoad() {
        this.canvas = director.getScene().getComponentInChildren(Canvas);
        this._isShooting = false;
        this.timeShooting = 0.2; //speed shoot
        this.barrelShooting = 2;
        this.speedBullet = 500;
        this.timeCounter = 0;
        this.updateDataShooting(0.3, 2, 600);
    }

    start() {
    }

    lateUpdate(deltaTime: number) {
        if(!GameController.waitingLoadData) return;
        this.shooting(deltaTime);
    }

    updateDataShooting(timeShooting: number, barrelShooting: number, speedBullet: number) {
        this.timeShooting = timeShooting;
        this.barrelShooting = barrelShooting;
        this.speedBullet = speedBullet;
        this.timeCounter = 0;
    }

    shootingOnBarrel(barrelPosition: Vec3, angle: number, speed: number) {
        let bullet = BulletSpawner.instance.spawn("Bullet", angle, barrelPosition);
        bullet.active = true;
        bullet.getComponent(Bullet).init(angle, speed, barrelPosition);
     //   bullet.getComponent(Bullet).startFly();
        bullet.getComponent(Bullet).enabledSendDamage();
        AudioManage.instance.bulletShoot.play();
    }

    shooting(deltaTime: number) {        
        if(!this._isShooting) {
            this.timeCounter = 0;
            return;
        }
    
        this.timeCounter += deltaTime;  
        if(this.timeCounter >= this.timeShooting) {
            this.timeCounter = 0;
            let posInWorld = this.node.getWorldPosition();           
            if(this.barrelShooting === 2) {
                let barrelPosition1 = new Vec3(posInWorld.x + this.node.getComponent(UITransform).width / 2, posInWorld.y, posInWorld.z);
                this.shootingOnBarrel(barrelPosition1, 90, this.speedBullet);

                let barrelPosition2 = new Vec3(posInWorld.x - this.node.getComponent(UITransform).width / 2, posInWorld.y, posInWorld.z);
                this.shootingOnBarrel(barrelPosition2, 90, this.speedBullet);
            }
            else {
                let barretPosition = posInWorld;
                let startAngle = 90 - Math.floor(this.barrelShooting / 2) * 5;

                for(let i = 0; i < this.barrelShooting; i++) {
                    let angle = startAngle + i * 5;
                    this.shootingOnBarrel(barretPosition, angle, this.speedBullet);
                }
            }
        }
        else 
            return;
    }

    public set isShooting(value: boolean) {
        this._isShooting = value;
    }
    
}


