import { _decorator, Component, Node, tween, Tween, Vec2, Vec3 } from 'cc';
import { GameController } from '../GameController';
const { ccclass, property } = _decorator;

@ccclass('UI_Start')
export class UI_Start extends Component {
    @property(Node)
    hand: Node;
    
    @property(Node)
    tutorial: Node;

    private delayTime: number; // Thời gian các item vào đúng vị trí
    private startPosition: Vec3;
    private endPosition: Vec3;
    private isTweening: boolean;
    onLoad() {
        this.delayTime = 1;
        this.hand.active = false;
        this.tutorial.active = false;
        this.startPosition = new  Vec3(0, -800, 0);
        this.endPosition = new  Vec3(0, -560, 0);   
        this.isTweening = false;   
    }

    start() {
        this.isTweening = true;
    }
    tweenTutorial() {
        Tween.stopAllByTarget(this.tutorial);
        tween(this.tutorial)
            .call(() => this.tutorial.active = true)
            .call(() => this.tutorial.setPosition(this.startPosition))
            .to(1, {position: this.endPosition}, {easing: "cubicIn"})
            .start();
    }

    
    tweenHand() {
        this.hand.active = true;
        Tween.stopAllByTarget(this.hand);
        let handPos = this.hand.getPosition();

        tween(this.hand)            
            .repeatForever(
                tween(this.hand)
                    .to(0.8, {position: new Vec3(handPos.x + 73, handPos.y, handPos.z)}, {easing: 'cubicInOut'})
                    .delay(0.2)
                    .to(0.8, {position: new Vec3(handPos.x - 73, handPos.y, handPos.z)}, {easing: 'cubicInOut'})
                    .delay(0.2)
                )
                .union()
            .start();          
    }
            
    onClickOverlay(event: UIEvent) {
        this.node.active = false;
    }

    update(deltaTime: number) {
        if(!GameController.waitingLoadData) return;
        if(this.isTweening) {
            this.delayTime -= deltaTime;
            if(this.delayTime <= 0) {
                this.delayTime = 1;
                this.isTweening = false;
                this.tweenHand();
                this.tweenTutorial();
            }
        }
    }
}


