import { _decorator, Collider2D, Component, Contact2DType, EPhysics2DDrawFlags, IPhysics2DContact, Node, PhysicsSystem2D, Vec3 } from 'cc';
import { AnimSpawner } from '../Anim/AnimSpawner';
const { ccclass, property } = _decorator;

@ccclass('DamageReceive')
export class DamageReceive extends Component {
    private _hp: number; //Health Points
    private _MAXHP: number;

    onLoad() {
        this._MAXHP = 30;  
        
        PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.Aabb |
        EPhysics2DDrawFlags.Pair |
        EPhysics2DDrawFlags.CenterOfMass |
        EPhysics2DDrawFlags.Joint |
        EPhysics2DDrawFlags.Shape;
    }
    
    start() {
        this._hp = this._MAXHP;
    }


    lateUpdate(dt: number) {        
        this.checkStateDead();
    }

    addHealthPoint(hp: number) {
        this._hp += hp;
        if(this._hp > this._MAXHP) 
            this._hp = this._MAXHP;
    }

    deductHealthPoint(hp: number) {
        this._hp -= hp;
        console.log("this._hp: " + this._hp);
        if(this._hp < 0)
            this._hp = 0;
    }

    checkStateDead() {
        if(!this.isDead()) 
            return;
        this.handleStateDead();
    }

    isDead() {
        return this._hp <= 0;
    }

    handleStateDead() {
        console.log("handleStateDead")
        // this._hp = this._MAXHP;
        // this.node.parent.active = false;
        this.spawnerAnimExplosion();
        // this.node.destroy();
    }

    spawnerAnimExplosion() {
        let animName = AnimSpawner.animExplosion;
        let posInWorld = this.node.getWorldPosition();
        let angle = 90;
        let anim = AnimSpawner.instance.spawn(animName, angle, posInWorld);
        anim.active = true;
    }

    public set MAXHP(value: number) {
        this._MAXHP = value;
    }
}


