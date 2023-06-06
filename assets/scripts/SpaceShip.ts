import { _decorator, Camera, Canvas, Component, director, EventMouse, Input, input, math, Node, tween, UITransform, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SpaceShip')
export class SpaceShip extends Component {
    private canvas: Canvas;
    private isTracking: boolean;
    private delayTime: number; // Thời gian các item vào đúng vị trí
    onLoad() {
        this.canvas = director.getScene().getComponentInChildren(Canvas);    
        this.isTracking = false;   
        this.delayTime = 2;
    }

    start() {
        input.on(Input.EventType.MOUSE_DOWN, (event: EventMouse) => this.isTracking = true, this);
        input.on(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);
        input.on(Input.EventType.MOUSE_UP, (event: EventMouse) => this.isTracking = false, this);
    }

    onMouseMove(event: EventMouse) {     
        if(!this.isTracking) 
            return;
        let mousePos = event.getUILocation();
        let UICanvas = this.canvas.getComponent(UITransform);
        let newPos = new Vec3(mousePos.x - UICanvas.width / 2, mousePos.y - UICanvas.height / 2);
        this.node.setPosition(newPos);
    }
}


