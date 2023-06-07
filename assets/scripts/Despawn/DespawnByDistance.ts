import { _decorator, Camera, Canvas, Component, director, UITransform, Vec2, Vec3 } from 'cc';
import { Bullet } from '../Bullet/Bullet';
import { Despawner } from './Despawn';
const { ccclass, property } = _decorator;

@ccclass('DespawnerByDistance')
export class DespawnerByDistance extends Despawner {
    private canvas: Canvas;
    private camera: Camera;
    private cameraPosition: Vec3;
    private distanceMax: number;

    onLoad() {
        super.onLoad();
        this.canvas = director.getScene().getComponentInChildren(Canvas);
        this.camera = this.canvas.getComponentInChildren(Camera);
        this.cameraPosition = this.camera.node.getWorldPosition(); // (360, 640, 1000)
        this.distanceMax = this.caculatorDistanceMax();
        // console.log("distanceMax: ", this.distanceMax);
    }

    start() {
        super.start();
    }

    //Override checkDeswnable
    checkDespawnable(): boolean {
        let distance = this.caculatorDistance();
        if(distance && distance > this.distanceMax) {
            return true;
        }

        return false;
    }

    caculatorDistanceMax() {
        let originWorldPos = new Vec3(0, 0, 0);
        let distanceMax = Vec3.squaredDistance(originWorldPos, this.cameraPosition);
        return distanceMax;
    }

    caculatorDistance() {
        if(!this.node.parent) 
            return null;

        let posInWorld = this.node.parent.getWorldPosition();
        let distance = Vec3.squaredDistance(posInWorld, this.cameraPosition);
        return distance;
    }

    //override
    despawnNode(): void {
        console.log("despawnNode");
        this.node.parent.destroy();
    }
}


