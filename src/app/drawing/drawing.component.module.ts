import {NgModule} from "@angular/core";
import {DrawingComponent} from "./drawing.component";
import {DrawingDirective} from "./drawing.directive";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {AppComponent} from "../app.component";

@NgModule({
    imports: [BrowserModule, FormsModule],
    declarations: [DrawingComponent, DrawingDirective],
    bootstrap: [DrawingComponent],
    exports: [
        DrawingComponent
    ]
})
export class DrawingComponentModule{}