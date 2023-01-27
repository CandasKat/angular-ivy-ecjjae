import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Path, Point, Rectangle, Project, Size, Color, Shape } from 'paper';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  private hitOptions = {
    segments: true,
    stroke: true,
    fill: true,
    tolerance: 5,
  };
  private segment;
  private path;
  private project;
  private movePath: boolean = false;
  /** Template reference to the canvas element */
  @ViewChild('image') image: ElementRef;
  @ViewChild('canvasEl') canvasEl: ElementRef;
  private canvas: HTMLCanvasElement;

  constructor() {}

  ngAfterViewInit() {
    this.dragElement(this.image.nativeElement);
    this.project = new Project(this.canvas);
  }

  // get image position

  public getPosition(): {
    x: number;
    y: number;
    width: number;
    height: number;
  } {
    const rect = this.image.nativeElement;
    return {
      x: rect.offsetLeft,
      y: rect.offsetTop,
      width: rect.offsetWidth,
      height: rect.offsetHeight,
    };
  }

  // drawing rectangle

  public draw(): void {
    let pos: { x: any; y: any; width: any; height: any } = this.getPosition();
    let rect = new Rectangle(
      new Point(pos.x, pos.y),
      new Size(pos.width, pos.height)
    );
  }

  // drag elements

  public dragElement(elmnt): void {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      elmnt.style.top = elmnt.offsetTop - pos2 + 'px';
      elmnt.style.left = elmnt.offsetLeft - pos1 + 'px';
    }

    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
      console.log('x: ' + elmnt.style.left + ',  y: ' + elmnt.style.top);
    }
  }

  // resize elements

  public onMouseDown(event): void {
    this.segment = this.path = null;
    let hitResult = this.project.hitTest(event.point, this.hitOptions);
    if (!hitResult) return;

    if (event.modifiers.shift) {
      if (hitResult.type == 'segment') {
        hitResult.segment.remove();
      }
      return;
    }

    if (hitResult) {
      this.path = hitResult.item;
      if (hitResult.type == 'segment') {
        this.segment = hitResult.segment;
      } else if (hitResult.type == 'stroke') {
        var location = hitResult.location;
        this.segment = this.path.insert(location.index + 1, event.point);
        this.path.smooth();
      }
    }
    this.movePath = hitResult.type == 'fill';
    if (this.movePath) this.project.activeLayer.addChild(hitResult.item);
  }

  public onMouseMove(event): void {
    this.project.activeLayer.selected = false;
    if (event.item) event.item.selected = true;
  }

  public onMouseDrag(event): void {
    if (this.segment) {
      this.segment.point += event.delta;
      this.path.smooth();
    } else if (this.path) {
      this.path.position += event.delta;
    }
  }
}
