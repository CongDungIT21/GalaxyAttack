import { _decorator, BoxCollider2D, Collider2D, Component, Contact2DType, IPhysics2DContact, Node } from 'cc';
import { Ship } from '../Ship/Ship';
const { ccclass, property } = _decorator;

@ccclass('Looter')
export class Looter extends Component {


    start() {
        let collider = this.node.getComponent(BoxCollider2D)
        if(collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        console.log("Looter On BeginContact");
        this.node.parent.getComponent(Ship).enableShiled();
    }

    update(deltaTime: number) {
        
    }
}


