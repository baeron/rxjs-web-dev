import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MergeScanComponent } from './merge-scan/merge-scan.component';

@NgModule({
  declarations: [
    AppComponent,
    MergeScanComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
