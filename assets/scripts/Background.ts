import { _decorator, Canvas, Component, director, Node, UITransform, Vec3, view, WebView } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Background')
export class Background extends Component {
    private speed: number = 150;
    private heightCanvas: number;

    start() {
        this.heightCanvas = director.getScene().getComponentInChildren(Canvas).getComponent(UITransform).height;
        this.node.children.forEach((node, index) => {
            node.setPosition(new Vec3(0, this.heightCanvas * index + 1, 0));
        })
    }

    move(node: Node, offset: number) {
        let positionNode = node.getPosition();
        let newNodeY = positionNode.y - offset;

        if(newNodeY <= -this.heightCanvas/2 ) {
            positionNode.y += this.heightCanvas * 2 - offset;
        }
        else {
            positionNode.y -= offset;
        }
        node.setPosition(positionNode);
    }

    update(deltaTime: number) {
        this.node.children.forEach(node => this.move(node, deltaTime * this.speed));
    }
}


