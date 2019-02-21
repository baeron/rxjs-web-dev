import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HttpClientJsonpModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { AutoCompleteComponent } from "./auto-complete/auto-complete.component";

@NgModule({
  declarations: [AppComponent, AutoCompleteComponent],
  imports: [BrowserModule, HttpClientModule, HttpClientJsonpModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
