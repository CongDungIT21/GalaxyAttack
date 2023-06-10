import { _decorator, Component, instantiate, Node, Prefab, UITransform, Vec3 } from 'cc';
import { BulletFly } from './BulletFly';
import { BulletDespawn } from './BulletDespawn';
import { DamageSender } from '../Damage/DamageSender';
import { ItemDrop } from '../Item/ItemDrop';
import { AudioManage } from '../AudioManage';
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

    startFly() {
        this.bulletFly.isStart = true;
    }

    stopFly() {
        this.bulletFly.isStart = false;
    }

    // startAnimation() {
    //     this.node.removeAllChildren();
    //     let newAnim = instantiate(this.bulletAnim);
    //     this.node.addChild(newAnim);  
        
    //     setTimeout(() => this.isDead = true, 100);
    // }

    enabledSendDamage() {
        this.damageSender.node.active = true;
        this.node.getChildByName("Model").active = true;
    }

    disableSendDamage() {
        this.damageSender.node.active = false;
        this.node.getChildByName("Model").active = false;
    }

    update(deltaTime: number) {
        if(this.isDead) 
            this.node.destroy();
    }
}


