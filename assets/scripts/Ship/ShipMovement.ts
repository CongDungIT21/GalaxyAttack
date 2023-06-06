import { _decorator, Camera, Canvas, Component, director, EventMouse, input, Input, Node, UITransform, v3, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ShipMovement')
export class ShipMovement extends Component {
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
        input.on(Input.EventType.MOUSE_DOWN, (event: EventMouse) => this.isTracking = true, this);
        input.on(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);
        input.on(Input.EventType.MOUSE_UP, (event: EventMouse) => this.isTracking = false, this);
    }

    onMouseMove(event: EventMouse) {
        if(!this.isTracking) return;
        const screenSpace = event.getLocation();
        const worldSpace = this.camera.screenToWorld(new Vec3(screenSpace.x, screenSpace.y, 0));
        const newPos = this.node.parent.parent.getComponent(UITransform).convertToNodeSpaceAR(worldSpace);
        this.newPosition = newPos;
    }

    getPostionInOtherNode (spaceNode: Node, targetNode: Node) {        
		if (targetNode.parent == null) {
			return null;
		}
		let pos = targetNode.parent.getComponent(UITransform).convertToWorldSpaceAR(targetNode.getPosition());
		return spaceNode.getComponent(UITransform).convertToNodeSpaceAR(pos);
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


