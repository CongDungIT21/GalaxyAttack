import { _decorator, BoxCollider2D, CircleCollider2D, Collider2D, Component, Contact2DType, IPhysics2DContact, Node, Vec3 } from 'cc';
import { ItemDrop } from '../Item/ItemDrop';
const { ccclass, property } = _decorator;

@ccclass('Pickupable')
export class Pickupable extends Component {
    start() {
        let collider = this.node.getComponent(CircleCollider2D)
        if(collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // console.log("Pickupable On BeginContact");
        this.node.parent.getComponent(ItemDrop).despawnItem();
    }

    update(deltaTime: number) {
        this.node.setPosition(new Vec3(0, 0, 0));
    }
}


