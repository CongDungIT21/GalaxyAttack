import { _decorator, Component, director, Node, tween, Vec3 } from 'cc';
import { GameController } from '../GameController';
const { ccclass, property } = _decorator;

@ccclass('UI_End')
export class UI_End extends Component {
    start() {
        this.node.active = false
    }
    
    
    update(deltaTime: number) {
        
    }

    show() {
        this.node.active = true;
        let model = this.node.getChildByName("Model");
        tween(model)
            .call(() => model.scale = new Vec3(0.2, 0.2, 1))
            .to(0.2, {scale: new Vec3(1, 1, 1)})
            .start();
    }

    hide() {
        tween(this.node)
            .to(0.1, {scale: new Vec3(1.2, 1.2, 1)})
            .call(() => this.node.active = false)
            .start();            
    }

    onClickPlayNow() {
        GameController.instance.rePlayGame();
    }
}


