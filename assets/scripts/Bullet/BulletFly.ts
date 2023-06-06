import { _decorator, Component, math, misc, Node, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BulletFly')
export class BulletFly extends Component {
    private speed: number;
    private angle: number;

    protected onLoad(): void {
        this.speed = 100;
        this.angle = 30;
    }
    
    start() {

    }

    update(deltaTime: number) {
        this.moving(deltaTime);
    }

    moving(deltaTime: number) {                
        let angleInRadians = misc.degreesToRadians(this.angle);
        this.node.parent.angle = this.angle - 90;
        let vectorDirector = new Vec3(Math.cos(angleInRadians), Math.sin(angleInRadians), 0);
        let oldPos = this.node.parent.getPosition();
        let rotationVector = vectorDirector.multiply(oldPos);

        let spaceX = this.speed * deltaTime;
        let spaceY = this.speed * deltaTime;

        let newPos = new Vec3(rotationVector.x + spaceX, rotationVector.y + spaceY, 0);
        this.node.parent.setPosition(newPos);
    }
}


