import { _decorator, Collider2D, Component, Contact2DType, EPhysics2DDrawFlags, IPhysics2DContact, Node, PhysicsSystem2D, random, Vec3 } from 'cc';
import { AnimSpawner } from '../Anim/AnimSpawner';
import { ItemDropSpawner } from '../Item/ItemDropSpawner';
import { Bullet } from '../Bullet/Bullet';
import { Enemy } from '../Enemy/Enemy';
import { AudioManage } from '../AudioManage';
import { GameController } from '../GameController';
const { ccclass, property } = _decorator;

@ccclass('DamageReceive')
export class DamageReceive extends Component {
    private _hp: number; //Health Points
    private _MAXHP: number;
    private isStateDead: boolean;
    private parentNode: Node;

    onLoad() {
        this._MAXHP = 30;  
        this.parentNode = this.node.parent;
        this.isStateDead = false;
    }
    
    start() {
        this._hp = this._MAXHP;
    }


    update(dt: number) {        
        this.checkStateDead();
    }

    addHealthPoint(hp: number) {
        this._hp += hp;
        if(this._hp > this._MAXHP) 
            this._hp = this._MAXHP;
    }

    deductHealthPoint(hp: number) {
        this._hp -= hp;
        // console.log("this._hp: " + this._hp);
        if(this._hp < 0)
            this._hp = 0;
    }

    checkStateDead() {
        if(!this.isDead() || this.isStateDead) 
            return;
        
        this.handleStateDead();
    }

    isDead() {
        return this._hp === 0;
    }

    resertHP() {
        this._hp = this._MAXHP;
        this.isStateDead = false;
    }

    handleStateDead() {
        this.isStateDead = true;

        this.playAudioDead();
        this.spawnerAnimExplosion();
        this.spawnerItemDrop();
        this.notifyEnemyDead()
        // this.node.destroy();
    }

    playAudioDead() {
        // console.log("playAudioDead")
        AudioManage.instance.enemyDie.play();        
    }

    spawnerAnimExplosion() {
        let animName = AnimSpawner.animExplosion;
        let posInWorld = this.node.getWorldPosition();
        let angle = 90;
        let anim = AnimSpawner.instance.spawn(animName, angle, posInWorld);
        anim.active = true;
    }

    spawnerItemDrop() {
        let randomNumber = Math.floor(Math.random() * 100) + 1;
        // console.log("Random Number: " + randomNumber);
        if(randomNumber > 20) 
            return;
        let enemy = this.parentNode;
        ItemDropSpawner.instance.dropItem(enemy.getComponent(Enemy).itemDrop, enemy.getWorldPosition(), enemy.angle);
    }

    notifyEnemyDead() {
        console.log("Notify Enemy Dead: ", this.parentNode.uuid);
        GameController.instance.enemyDead();
    }

    public set MAXHP(value: number) {
        this._MAXHP = value;
    }
}


