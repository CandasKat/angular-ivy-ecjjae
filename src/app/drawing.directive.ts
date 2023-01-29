import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appCanvas]',
})
export class CanvasDirective implements OnInit {
  public c = this.el.nativeElement.querySelector('canvas');
  public drawButton = this.el.nativeElement.querySelector('draw');
  public dragButton = this.el.nativeElement.querySelector('drag');
  public output = this.el.nativeElement.querySelector('output');
  public deleteButton = this.el.nativeElement.querySelector('delete');
  public ctx;
  public draw = false;
  public mouseX = 0;
  public mouseY = 0;
  public lastMouseX = 0;
  public lastMouseY = 0;
  public canvasX;
  public canvasY;
  public rectId = 0;
  public currentShapeIndex;

  public drag = false;
  public isDrawable = false;
  public isDraggable = false;
  public isDeleted = false;
  public rectangles = [];
  public selectedRectangle = null;

  public offsetx;
  public offsety;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.c.width = window.innerWidth - 200;
    this.c.height = window.innerHeight - 200;
    this.ctx = this.c.getContext('2d');
    this.ctx.lineWidth = 2;
    window.onscroll = () => {
      this.getOffset();
    };
    window.onresize = () => {
      this.getOffset();
    };
    this.c.onresize = () => {
      this.getOffset();
    };
    this.canvasX = this.c.offsetLeft;
    this.canvasY = this.c.offsetTop;
  }

  public getOffset() {
    let canvasOffsets = this.c.getBoundingClientRect();
    this.offsetx = canvasOffsets.left;
    this.offsety = canvasOffsets.top;
  }

  public onDrawClick() {
    this.isDrawable = true;
    this.isDraggable = false;
  }

  public onDragClick() {
    this.isDraggable = true;
    this.isDrawable = false;
  }

  public onDeleteClick() {
    this.ctx.clearRect(0, 0, this.c.width, this.c.height);
    this.isDraggable = false;
    this.isDrawable = false;
    this.isDeleted = true;
  }

  public isMouseInRect(x, y, shape) {
    let shapeLeft = shape.x;
    let shapeRight = shape.x + shape.width;
    let shapeTop = shape.y;
    let shapeBottom = shape.y + shape.height;

    if (x > shapeLeft && x < shapeRight && y > shapeTop && y < shapeBottom) {
      return true;
    }
    return false;
  }

  // drawing shapes
  public onMouseDown(event: MouseEvent) {
    event.preventDefault();
    this.mouseX = event.pageX - this.canvasX;
    this.mouseY = event.pageY - this.canvasY;
    this.draw = true;
    this.rectId++;

    if (this.isDraggable) {
      let index = 0;
      for (let shape of this.rectangles) {
        if (this.isMouseInRect(this.mouseX, this.mouseY, shape)) {
          this.currentShapeIndex = index;
          this.drag = true;
          this.selectedRectangle = shape;
        }
        index++;
      }
    }
  }

  public onMouseUp(event: MouseEvent) {
    event.preventDefault();
    this.draw = false;
    this.drag = false;
    if (this.isDrawable) {
      let width = this.lastMouseX - this.mouseX;
      let height = this.lastMouseY - this.mouseY;
      let id = this.rectangles.length + 1;
      let rectangle = { id, x: this.mouseX, y: this.mouseY, width, height };
      this.rectangles.push(rectangle);
      this.selectedRectangle = rectangle;
    }
  }

  public onMouseMove(event: MouseEvent) {
    event.preventDefault();
    this.lastMouseX = event.pageX - this.canvasX;
    this.lastMouseY = event.pageY - this.canvasY;

    if (this.draw && this.isDrawable) {
      this.drawShape();
    }
    if (this.isDraggable && this.drag) {
      this.dragElements();
    }
    this.output.innerHTML = `last: ${this.mouseX}, ${this.mouseY} <br/>current: ${this.lastMouseX}, ${this.mouseY}<br/>isDrawable: ${this.isDrawable}<br/>isDraggable: ${this.isDraggable} `;
  }

  public drawShape() {
    let width = this.lastMouseX - this.mouseX;
    let height = this.lastMouseY - this.mouseY;
    this.ctx.fillRect(this.mouseX, this.mouseY, width, height);
    this.ctx.stroke();
  }

  public dragElements() {
    if (!this.isDeleted) {
      this.rectangles.forEach((rectangle) => {
        this.ctx.fillRect(
          rectangle.x,
          rectangle.y,
          rectangle.width,
          rectangle.height
        );
        this.ctx.stroke();
      });
    }
    let currentShape = this.rectangles[this.currentShapeIndex];
    this.ctx.clearRect(
      currentShape.x,
      currentShape.y,
      currentShape.width,
      currentShape.height
    );
    currentShape.x = this.lastMouseX;
    currentShape.y = this.lastMouseY;

    this.rectangles.forEach((rectangle) => {
      if (rectangle === this.selectedRectangle) {
        this.ctx.fillRect(
          rectangle.x,
          rectangle.y,
          rectangle.width,
          rectangle.height
        );
        this.ctx.stroke();
      }
    });
  }
}
