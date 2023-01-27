import { Component, ElementRef, Input, OnInit } from '@angular/core';
import {
  Color,
  Path,
  Point,
  Rectangle,
  Shape,
  Size,
} from 'paper/dist/paper-core';

@Component({
  selector: 'rect',
  template: '<canvas #canvasEl></canvas>',
  styles: ['position: absolute; z-index: 7;'],
})
export class RectComponent implements OnInit {
  @Input() public element;
  constructor() {}
  public ngOnInit() {
    this.draw(this.element);
  }

  public getPosition(element: ElementRef): {
    x: number;
    y: number;
    width: number;
    height: number;
  } {
    const rect = element.nativeElement;
    return {
      x: rect.offsetLeft,
      y: rect.offsetTop,
      width: rect.offsetWidth,
      height: rect.offsetHeight,
    };
  }

  public draw(element): void {
    let pos: { x: any; y: any; width: any; height: any } =
      this.getPosition(element);
    let rect = new Shape.Rectangle(new Point(8, 8), new Size(200, 120));
    rect.strokeColor = new Color('blue');
    rect.strokeWidth = 2;
    rect.selected = true;
  }
}
