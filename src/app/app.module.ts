import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './components/shared/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { TableComponent } from './components/shared/table/table.component';
import { CommentsComponent } from './components/comments/comments.component';
import { ServiceFeesComponent } from './components/service-fees/service-fees.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    CommentsComponent,
    ServiceFeesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
