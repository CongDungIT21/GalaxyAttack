import { _decorator, Component, Node, tween, Tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Ship')
export class Ship extends Component {
    private startPos: Vec3;
    private endPos: Vec3;

    onLoad() {
        this.startPos = new Vec3(0, 0, 0);
        this.endPos = new Vec3(500, 500, 0);
    }

    // onEnable() {
    //     this.actionActive();
    // }

    start() {
        this.node.active = false;
    }

    update(deltaTime: number) {
        
    }

    actionActive() {
        Tween.stopAllByTarget(this.node);
        tween(this.node)
            .call(() => this.node.setPosition(this.startPos))
            .to(1, {position: this.endPos}, {easing: "cubicIn"})
            .start()
    }

    startMoving(startPos: Vec3, endPos: Vec3) {
        this.node.active = true;
        this.startPos = startPos;
        this.endPos = endPos;
        this.actionActive();
    }
}


