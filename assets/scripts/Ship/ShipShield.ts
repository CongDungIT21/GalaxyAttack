import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
import { ShipShooting } from './ShipShooting';
import { Ship } from './Ship';
const { ccclass, property } = _decorator;

@ccclass('ShipShield')
export class ShipShield extends Component {
    @property(Prefab)
    normalShield: Prefab;
    @property(Prefab)
    powerUpShiled: Prefab;

    private usingShiled: boolean = false;
    private timeUsed: number
    private shiledPowerUp: boolean;
    onLoad() {
        this.usingShiled = false;
        this.shiledPowerUp = false;
    }

    start() {
        this.showNormalShield(5);
    }
    
    update(deltaTime: number) {
        if(this.usingShiled) {
            this.timeUsed -= deltaTime;
            if(this.timeUsed <= 0) {
                this.usingShiled = false;
                this.node.removeAllChildren();                
                if(this.shiledPowerUp) {
                    this.shiledPowerUp = false;
                    this.node.parent.getComponent(Ship).powerUpDone();
                }
            }
        }
    }

    showPowerUpShield(timeUsed: number) {    
        this.node.removeAllChildren();    
        this.timeUsed = timeUsed;
        this.usingShiled = true;
        this.shiledPowerUp = true;
        let shield = instantiate(this.powerUpShiled);
        this.node.addChild(shield);
    }

    showNormalShield(timeUsed: number) {
        this.node.removeAllChildren();
        this.timeUsed = timeUsed;
        this.usingShiled = true;
        let shield = instantiate(this.normalShield);
        this.node.addChild(shield);
    }    
}


