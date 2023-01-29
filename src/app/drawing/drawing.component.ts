import {Component, ViewChild} from "@angular/core";
import {DrawingDirective} from "./drawing.directive";

@Component({
    selector: "rect-draw",
    templateUrl: "./drawing.component.html"
})
export class DrawingComponent {
    @ViewChild(DrawingDirective, {static: false}) canvas: DrawingDirective;
    constructor() {
    }

    onDrawClick(){
        this.canvas.onDrawClick()
    }

    onDragClick(){
        this.canvas.onDragClick();
    }

    onDeleteClick(){
        this.canvas.onDeleteClick();
    }
    onMouseDown(event: MouseEvent){
        this.canvas.onMouseDown(event);
    }

    onMouseUp(event: MouseEvent){
        this.canvas.onMouseUp(event);
    }

    onMouseMove(event: MouseEvent){
        this.canvas.onMouseMove(event);
    }
}