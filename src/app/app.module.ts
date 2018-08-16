import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Components
import { AppComponent } from './app.component';
import { SystemsComponent } from './systems/systems.component';

// Services
import {DaedalusService} from './services/daedalus/daedalus.service';


@NgModule({
  declarations: [
    AppComponent,
    SystemsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [DaedalusService],
  bootstrap: [AppComponent]
})
export class AppModule { }
