import { _decorator, Component, math, misc, Node, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BulletFly')
export class BulletFly extends Component {
    private _speed: number;
    private _angle: number;
    private _isStart : boolean;
    private direction : Vec3;
    private parentNode: Node;

    onLoad() {
        this.parentNode = this.node.parent;
    }

    init(angle: number, speed: number) {
        this._speed = speed;
        this._angle = angle;
        this.calculateDirection();
    }

    update(deltaTime: number) {
        this.moving(deltaTime);
    }

    calculateDirection()
    {
        let _angleInRadians = misc.degreesToRadians(this._angle);
        this.parentNode.angle = this._angle - 90;
        let vectorDirector = new Vec3(Math.cos(_angleInRadians), Math.sin(_angleInRadians), 0);
        this.direction = vectorDirector;
    }

    moving(deltaTime: number) {                
        if(!this._isStart) 
            return;              
        let currentPos = this.parentNode.getPosition();
        let spaceX = this.direction.x * this._speed * deltaTime;
        let spaceY = this.direction.y * this._speed * deltaTime
        let newPos = new Vec3(currentPos.x + spaceX, currentPos.y + spaceY);       
        this.parentNode.setPosition(newPos);        
    }

    public set isStart(value: boolean) {
        this._isStart = value;
    }
    
}


