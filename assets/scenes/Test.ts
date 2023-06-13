import { _decorator, Component, instantiate, Node, Prefab, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Test')
export class Test extends Component {
    @property(Prefab)
    enemy: Prefab;

    start() {
        for(let i = 0;i < 35; i++) {
            let clone = instantiate(this.enemy);
            this.node.addChild(clone)
            clone.setPosition(new Vec3(i*10, i*10, 0));
        }
    }

    update(deltaTime: number) {
        
    }
}


