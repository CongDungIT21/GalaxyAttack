import { _decorator, AudioSource, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AudioManage')
export class AudioManage extends Component {
    @property(AudioSource)
    background: AudioSource;
    @property(AudioSource)
    bulletShoot: AudioSource;
    @property(AudioSource)
    enemyDie: AudioSource;
    @property(AudioSource)
    powerUp: AudioSource;

    private static _instance: AudioManage;

    onLoad() {
        if(!AudioManage._instance)
            AudioManage._instance = this;
    }
 
    public static get instance() : AudioManage {
        if(!AudioManage._instance)
            AudioManage._instance = new AudioManage();

        return AudioManage._instance; 
    }
    
}


