import { _decorator, Camera, Canvas, Component, director, EventMouse, input, Input, Node, UITransform, v3, Vec3 } from 'cc';
import { ShipShooting } from './ShipShooting';
const { ccclass, property } = _decorator;

@ccclass('ShipMovement')
export class ShipMovement extends Component {
    @property(ShipShooting)
    shipShooting: ShipShooting

    private camera: Camera;
    private canvas: Canvas;
    private isTracking: boolean;
    private newPosition: Vec3;
    private speed = 10;

    onLoad() {
        this.canvas = director.getScene().getComponentInChildren(Canvas);
        this.camera = this.canvas.getComponentInChildren(Camera);
        this.newPosition = null;
        this.isTracking = false;
    }

    start() {
        this.onMouseEvent();
    }

    offMouseEvent() {
        input.off(Input.EventType.MOUSE_DOWN);
        input.off(Input.EventType.MOUSE_MOVE);
        input.off(Input.EventType.MOUSE_UP);
        this.isTracking = false;
    }

    onMouseEvent() {
        input.on(Input.EventType.MOUSE_DOWN, (event: EventMouse) => {
            this.isTracking = true; 
            this.shipShooting.isShooting = true;
        }, this);
        input.on(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);
        input.on(Input.EventType.MOUSE_UP, (event: EventMouse) => {
            this.isTracking = false;
            this.shipShooting.isShooting = false;
        }, this);
    }

    onMouseMove(event: EventMouse) {
        if(!this.isTracking) return;
        const screenSpace = event.getLocation();
        const worldSpace = this.camera.screenToWorld(new Vec3(screenSpace.x, screenSpace.y, 0));
        const newPos = this.node.parent.parent.getComponent(UITransform).convertToNodeSpaceAR(worldSpace);
        this.newPosition = newPos;
    }

    update(deltaTime: number) {
        if(this.newPosition !== null && this.isTracking) {
            let timeDuration = deltaTime * this.speed;
            timeDuration = Math.min(timeDuration, 1.0);
            let lerp = new Vec3(0,0,0);
            let startPos = this.node.parent.position;
            Vec3.lerp<Vec3>(lerp,startPos,this.newPosition, timeDuration);
            this.node.parent.setPosition(lerp);
        }
    }
}


