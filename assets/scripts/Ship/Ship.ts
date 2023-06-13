import { _decorator, Component, Node, tween, Tween, Vec3 } from 'cc';
import { ShipShooting } from './ShipShooting';
import { ShipShield } from './ShipShield';
import { GameController } from '../GameController';
import { ShipMovement } from './ShipMovement';
const { ccclass, property } = _decorator;

@ccclass('Ship')
export class Ship extends Component {
    @property(ShipShooting)
    shipShooting: ShipShooting;
    @property(ShipShield)
    shipShield: ShipShield;
    @property(ShipMovement)
    shipMovement: ShipMovement;

    private startPos: Vec3;
    private endPos: Vec3;

    onLoad() {
        this.startPos = new Vec3(0, 0, 0);
        this.endPos = new Vec3(500, 500, 0);
    }

    start() {
        this.node.active = false;
    }

    applyEffectFromItem(name: string) {
        this.applyEffectToShooting();
        this.applyEffectToShield();
    }

    applyEffectToShooting() {
        this.shipShooting.updateDataShooting(0.2, 5, 400);        
    }

    applyEffectToShield() {
        this.shipShield.showPowerUpShield(1.5);
    }

    powerUpDone() {
        this.shipShooting.updateDataShooting(0.3, 2, 600);
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

    stateEndGame() {
        this.shipShooting.isShooting = false;
        this.shipMovement.offMouseEvent();

        Tween.stopAllByTarget(this.node);
        let nowPos = this.node.getPosition();
        tween(this.node)
            .to(0.5, {position: new Vec3(nowPos.x, nowPos.y + 2000, 0)}, {easing: "cubicIn"})
            .call(() => GameController.instance.showEndGame())
            .start()
    }

    stateStartGame() {
        this.shipMovement.onMouseEvent();
    }
}


