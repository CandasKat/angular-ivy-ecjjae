import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {DrawingDirective} from "./drawing/drawing.directive";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  /** Template reference to the canvas element */
  @ViewChild('image') image: ElementRef;


  constructor() {}

  ngAfterViewInit() {
    this.dragElement(this.image.nativeElement);
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
}

// resize elements
