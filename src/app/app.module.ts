import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {DrawingComponentModule} from "./drawing/drawing.component.module";
import {DrawingComponent} from "./drawing/drawing.component";

@NgModule({
  imports: [BrowserModule, FormsModule, DrawingComponentModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
