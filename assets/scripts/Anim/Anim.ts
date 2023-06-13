import { _decorator, Animation, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Anim')
export class Anim extends Component {
    onEnable() {
        this.node.getComponent(Animation).play();
    }

    start() {

    }
}


