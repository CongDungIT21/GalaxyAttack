import { _decorator, Component, Node, Prefab, tween, Tween, Vec3 } from 'cc';
import { DamageReceive } from '../Damage/DamageReceive';
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy extends Component {

    
    @property(Prefab)  
    itemDrop: Prefab;
    
    private damageReceive: DamageReceive;
    private startPos: Vec3;
    private endPos: Vec3;

    onLoad() {
        this.startPos = new Vec3(0, 0, 0);
        this.endPos = new Vec3(500, 500, 0);
        this.damageReceive = this.node.getComponentInChildren(DamageReceive);
        // console.log(this.damageReceive);
    }


    start() {
        // this.node.active = false;
    }

    actionActive() {
        // console.log("actionActive")
        Tween.stopAllByTarget(this.node);
        tween(this.node)
            .call(() => this.node.setPosition(this.startPos))
            .to(3, {position: this.endPos}, {easing: "cubicIn"})
            .start()
    }

    startMoving(startPos: Vec3, endPos: Vec3) {
        // console.log("Enemt start moving")
        this.node.active = true;
        this.startPos = startPos;
        this.endPos = endPos;
        this.actionActive();
    }

    resertHP() {
        this.damageReceive.resertHP();
    }
}


