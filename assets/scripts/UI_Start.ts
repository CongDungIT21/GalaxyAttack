import { _decorator, Component, Node, tween, Tween, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UI_Start')
export class UI_Start extends Component {
    @property(Node)
    hand: Node;
    
    @property(Node)
    tutorial: Node;

    private delayTime: number; // Thời gian các item vào đúng vị trí

    onLoad() {
        this.delayTime = 2;
        this.hand.active = false;
        this.tutorial.active = false;        
    }

    start() {
        this.tweenHand();
        this.tweenTutorial();
    }
    tweenTutorial() {
        throw new Error('Method not implemented.');
    }

    
    tweenHand() {
        Tween.stopAllByTarget(this.hand);
        let handPos = this.hand.getPosition();
        tween(this.hand)
            .delay(this.delayTime)
            .call(() => this.hand.active = true)
            .repeatForever(
            tween(this.hand)
                .to(0.8, {position: new Vec3(handPos.x + 73, handPos.y, handPos.z)}, {easing: 'cubicInOut'})
                .delay(0.2)
                .to(0.8, {position: new Vec3(handPos.x - 73, handPos.y, handPos.z)}, {easing: 'cubicInOut'})
                .delay(0.2)
                )
                .start();
                
    }
            
    onClickOverlay(event: UIEvent) {
        this.node.active = false;
    }

    update(deltaTime: number) {
        
    }
}


