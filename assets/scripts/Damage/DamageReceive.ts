import { _decorator, Collider2D, Component, Contact2DType, EPhysics2DDrawFlags, IPhysics2DContact, Node, PhysicsSystem2D } from 'cc';
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
        if(this._hp < 0)
            this._hp = 0;
    }

    checkStateDead() {
        if(!this.isDead()) 
            return;
        this.handleStateDead();
    }

    isDead() {
        return this._hp === 0;
    }

    handleStateDead() {
        
    }

    public set MAXHP(value: number) {
        this._MAXHP = value;
    }
}


