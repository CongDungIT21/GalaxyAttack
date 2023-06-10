import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Despawner')
export abstract class Despawner extends Component {

    onLoad(){
        
    }

    start() {
    }

    // update(deltaTime: number) {
        
    // }

    protected lateUpdate(dt: number): void {
        this.despawning();
    }

    despawning() {
        if(!this.checkDespawnable()) 
            return

        // console.log("despawnNode")
        this.despawnNode();        
    }

    // abstract despawnNode() {
    //     this.node.parent.destroy();
    // }

    abstract despawnNode(): void;
    abstract checkDespawnable(): boolean;
}


