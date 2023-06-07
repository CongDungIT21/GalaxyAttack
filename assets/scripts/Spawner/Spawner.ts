import { _decorator, Component, game, Game, instantiate, Node, Prefab, UITransform, Vec3 } from 'cc';
import { Bullet } from '../Bullet/Bullet';
const { ccclass, property } = _decorator;

@ccclass('Spawner')
export abstract class Spawner extends Component {    
    private holders: Node; // Node chứa những thứ đã spawn
    private spawneds: Node[]; // Những thứ đã được spawn

    private spawners: Node; // Node chứa những thứ có thể spam
    private spawnerable: Node[]; // Những thứ có thể spawn (prefabs)

    onLoad() {
        this.spawneds = [];
        this.spawnerable = [];
        this.spawners = this.node.getChildByName('Spawnes');
        this.holders = this.node.getChildByName('Holders');
    }

    start() {    
        this.hideSpawners(); 
    }

    loadSpawneds() {
        if(this.spawneds.length > 0) 
            return;

        this.spawners.children.forEach(pool => this.spawnerable.push(pool));
        this.hideSpawners();
    }

    hideSpawners() {
        this.spawners.children.forEach(pool => pool.active = false);
    }

    spawn(name: string, angle: number, posInWorld: Vec3) {
        //console.log("spawn");
        let nodePool = this.getNodePool(name);
        if(nodePool) {
            nodePool.parent = this.holders;
            let posInHolder = this.holders.getComponent(UITransform).convertToNodeSpaceAR(posInWorld);
            nodePool.setPosition(posInHolder);
            return nodePool;
        }

        throw new Error("Can't Spawn");
        
    }

    getNodePool(name: string) {
        //console.log("getNodePool", this.spawneds);
        //console.log("name", name);
        for (const node of this.spawneds) {
            if(node.name === name) {
                this.spawneds = this.spawneds.filter(_node => _node !== node);
                return node;                
            }
        }
        return this.getNewNodePool(name);
    }

    getNewNodePool(name: string) {
        //console.log("getNewNodePool", this.spawnerable);
        for (const node of this.spawnerable) {
            if(node.name === name) {
                let nodePool = instantiate(node);
                this.spawneds.push(nodePool);
                return nodePool;                
            }
        }

        return null;
    }

    despawnReStore(despawned: Node) {
        //console.log("despawnReStore", despawned);
        setTimeout(() =>  despawned.active = false, game.deltaTime); //??? Chỉ có thể active sau 1 frame
        this.spawneds.push(despawned);        
    }
}


