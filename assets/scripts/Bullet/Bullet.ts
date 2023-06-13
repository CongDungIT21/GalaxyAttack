import { _decorator, Component, instantiate, Node, Prefab, UITransform, Vec3 } from 'cc';
import { BulletFly } from './BulletFly';
import { BulletDespawn } from './BulletDespawn';
import { DamageSender } from '../Damage/DamageSender';
const { ccclass, property } = _decorator;

@ccclass('Bullet')
export class Bullet extends Component {
    @property(BulletFly)
    bulletFly: BulletFly;
    @property(DamageSender)
    damageSender: DamageSender;  

    @property(Prefab)
    bulletAnim: Prefab;


    private isDead: boolean;
    private posInWorld: Vec3;
    private angle: number;
    private speed: number;
    private model: Node;

    init(angle: number, speed: number, posInWorld: Vec3) {
        this.angle = angle;
        this.speed = speed;
        this.posInWorld = posInWorld;    
        this.startFly();
    }

    onLoad() {
        this.isDead = false;
        this.model = this.node.getChildByName("Model");
        this.stopFly();
    }

    startFly() {
        this.bulletFly.init(this.angle, this.speed);
        this.bulletFly.isStart = true;
    }

    stopFly() {
        this.bulletFly.isStart = false;
    }

    enabledSendDamage() {
        this.damageSender.node.active = true;
        this.model.active = true;
    }

    disableSendDamage() {
        this.damageSender.node.active = false;
        this.model.active = false;
    }

    update(deltaTime: number) {
        if(this.isDead) 
            this.node.destroy();
    }
}


