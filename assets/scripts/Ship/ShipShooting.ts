import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ShipShooting')
export class ShipShooting extends Component {
    private isShooting: boolean;

    onLoad() {
        this.isShooting = false;
    }

    start() {

    }

    shooting() {
        if(!this.isShooting) return;
        console.log('shooting');
    }

    update(deltaTime: number) {
        this.shooting();
    }
}


