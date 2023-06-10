import { _decorator, Camera, Canvas, Component, director, Director, Node, ResolutionPolicy, Size, UITransform, view, View } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CanvasController')
export class CanvasController extends Component { 
    private lastWidth = 0;
    private lastHeight = 0;
    private canvas;
    onLoad() {
        // this.canvas = director.getScene().getComponentInChildren(Canvas);
        // let canvasSize = this.canvas.node.getComponent(UITransform);
        // let windowSize = View.instance.getVisibleSize();

        // let ratioWindow = windowSize.width / windowSize.height;
        // let ratioCanvas = canvasSize.width / canvasSize.height;
        // if(ratioWindow >= ratioCanvas) {
        //     view.setDesignResolutionSize(canvasSize.width, canvasSize.height, ResolutionPolicy.FIXED_HEIGHT);
        // }     
        // else {
        //     view.setDesignResolutionSize(canvasSize.width, canvasSize.height, ResolutionPolicy.FIXED_WIDTH);
        // }   

        // this.lastWidth = 0;
        // this.lastHeight = 0;
    }

    start() {

    }

    update(deltaTime: number) {
        // this.updateCanvas();
    }

    updateCanvas() {
        // let designResolution = view.getDesignResolutionSize();
        // console.log(designResolution
        // let frameSize = view.getVisibleSize();

		// if (this.lastWidth !== frameSize.width || this.lastHeight !== frameSize.height) {

		// 	this.lastWidth = frameSize.width;
		// 	this.lastHeight = frameSize.height;

		// 	if (designResolution.width / designResolution.height > frameSize.width / frameSize.height) {
		// 		var newDesignSize = new Size(designResolution.width, designResolution.width * (frameSize.height / frameSize.width));
		// 		view.setDesignResolutionSize(newDesignSize.width, newDesignSize.height, ResolutionPolicy.FIXED_HEIGHT);
		// 		console.log("update canvas size: " + newDesignSize);
		// 	} else {
		// 		var newDesignSize = new Size(designResolution.height * (frameSize.width / frameSize.height), designResolution.height);
		// 		view.setDesignResolutionSize(newDesignSize.width, newDesignSize.height, ResolutionPolicy.FIXED_WIDTH);
		// 		console.log("update canvas size: " + newDesignSize);
		// 	}
		// }
    }
}


