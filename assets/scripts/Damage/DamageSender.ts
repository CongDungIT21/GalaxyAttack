import { _decorator, Collider2D, Component, Contact2DType, EPhysics2DDrawFlags, game, IPhysics2DContact, Node, PhysicsSystem2D } from 'cc';
import { DamageReceive } from './DamageReceive';
import { Bullet } from '../Bullet/Bullet';
import { AnimSpawner } from '../Anim/AnimSpawner';
import { GameController } from '../GameController';
const { ccclass, property } = _decorator;

@ccclass('DamageSender')
export class DamageSender extends Component {
    private damage: number;
    private isDead: boolean;
    private isActice: boolean;
    private parentNode: Node;
    onLoad() {
        this.damage = 10;
        this.isDead = false;
        this.isActice = false;
        this.parentNode = this.node.parent;
    }

    start() {
        let collider = this.node.getComponent(Collider2D)
        if(collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }
    
    lateUpdate(dt: number) {
        if(!GameController.waitingLoadData) return;
        //Tắt khả năng gửi Đam và va chạm => Lao ra khỏi màn hình => Despawn
        if(this.isActice) {
            this.parentNode.getComponent(Bullet).disableSendDamage();
            this.isActice = false;
        }
    }
        
    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        //Ko tương tác với bản thân và thứ tạo ra
        if(this.node.name === otherCollider.node.name) return;
        // if(this.node.parent.name === otherCollider.node.name) return;

        this.sendDamage(otherCollider.node);
        this.createrBulletAnim();
        //this.node.active = false; //Error ??
        this.isActice = true;
    }

    sendDamage(_node: Node) {
        //console.log("sendDamage");
        let damageReceive = _node.getComponent(DamageReceive);
        if(!damageReceive) return;
        damageReceive.deductHealthPoint(this.damage);
        this.isDead = true;
    }

    createrBulletAnim() {
        //console.log("createrBulletAnim");
        let nameAnim = AnimSpawner.animBullet;

        let anim = AnimSpawner.instance.spawn(nameAnim, 90, this.node.getWorldPosition());        
        anim.active = true;
    }

}


