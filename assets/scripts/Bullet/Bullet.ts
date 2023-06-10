import { _decorator, Component, instantiate, Node, Prefab, UITransform, Vec3 } from 'cc';
import { BulletFly } from './BulletFly';
import { BulletDespawn } from './BulletDespawn';
const { ccclass, property } = _decorator;

@ccclass('Bullet')
export class Bullet extends Component {
    @property(BulletFly)
    bulletFly: BulletFly;
    @property(BulletDespawn)
    bulletDespawn: BulletDespawn;
    
    @property(Prefab)
    bulletAnim: Prefab;
    private isDead: boolean;
    private posInWorld: Vec3;
    private angle: number;
    private speed: number;

    init(angle: number, speed: number, posInWorld: Vec3) {
        this.angle = angle;
        this.speed = speed;
        this.posInWorld = posInWorld;
    }

    onLoad() {
        this.isDead = false;
        this.stopFly();
    }

    start() {
        this.bulletFly.init(this.angle, this.speed);
    }


    despawn() {
        this.bulletDespawn.despawnNode();
    }

    startFly() {
        this.bulletFly.isStart = true;
    }

    stopFly() {
        this.bulletFly.isStart = false;
    }

    startAnimation() {
        this.node.removeAllChildren();
        let newAnim = instantiate(this.bulletAnim);
        this.node.addChild(newAnim);  
        
        setTimeout(() => this.isDead = true, 100);
    }

    update(deltaTime: number) {
        if(this.isDead) 
            this.node.destroy();
    }
}


