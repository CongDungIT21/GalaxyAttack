import { _decorator, Component, game, Game, instantiate, Node, Prefab, UITransform, Vec3 } from 'cc';
import { Bullet } from '../Bullet/Bullet';
import { GameController } from '../GameController';
const { ccclass, property } = _decorator;

@ccclass('Spawner')
export abstract class Spawner extends Component {    
    private holders: Node; // Node chứa những thứ đã spawn
    private spawneds: Node[]; // Những thứ đã được spawn

    private spawners: Node; // Node chứa những thứ có thể spam
    private spawnerable: Node[]; // Những thứ có thể spawn (prefabs)

    private nodeReStore: Node;
    private nameSpawner = null;

    getSpawnerable() {
        return this.spawnerable;
    }

    getSpawnered() {
        return this.spawneds;
    }

    onLoad() {
        this.spawneds = [];
        this.spawnerable = [];
        this.spawners = this.node.getChildByName('Spawnes');
        this.holders = this.node.getChildByName('Holders');
        this.nodeReStore = null;
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

    spawn(name: string, angle: number = 0, posInWorld: Vec3 = new Vec3(0, 0, 0)) {
        this.nameSpawner = name;
        // console.log("spawn " + name);
        let nodePool = this.getNodePool(name);

        if(nodePool) {
            // console.log("dem: ", this.dem++);
            nodePool.parent = this.holders;
            let posInHolder = this.holders.getComponent(UITransform).convertToNodeSpaceAR(posInWorld);
            nodePool.setPosition(posInHolder);
            // if(this.nameSpawner === "ItemDrop") console.log(this.holders.children);
            // console.log("pool: ", this.spawneds)
            return nodePool;
        }

        throw new Error("Can't Spawn");
        
    }

    getNodePool(name: string) {
        for (const node of this.spawneds) {
            if(node.name === name && node.active === false) {
                return node;                
            }
        }

        for(let i=0;i<this.spawneds.length;i++) {
            let _node = this.spawneds[i];
            if(_node.name === name && _node.active === false) {
                this.spawneds.splice(i, 1);
                return _node;
            }
        }

        return this.getNewNodePool(name);
    }

    getNewNodePool(name: string) {
        // if(this.nameSpawner === "ItemDrop") 
           // console.log("getNewNodePool", this.spawnerable.length);

        for (const node of this.spawnerable) {
            if(node.name === name) {
                let nodePool = instantiate(node);
                // this.spawneds.push(nodePool);
                return nodePool;                
            }
        }

        return null;
    }

    despawnReStore(despawned: Node) {
        //this.despawned.active = false; // Err activce
        // setTimeout(() =>  despawned.active = false, game.deltaTime); //??? Chỉ có thể active sau 1 frame

        this.nodeReStore = despawned;
        this.spawneds.push(despawned);        
    }

    lateUpdate(dt: number) {
        if(!GameController.waitingLoadData) return;
        if(this.nodeReStore) {
            this.nodeReStore.active = false;
            // this.spawneds.push(this.nodeReStore);
            this.nodeReStore = null;
        }
    }
}


