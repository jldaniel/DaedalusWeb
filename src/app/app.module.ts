import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';
import { SystemsListComponent } from './systems-list/systems-list.component';
import { NewSystemComponent } from './new-system/new-system.component';

// Services
import { DaedalusService } from './services/daedalus/daedalus.service';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { SystemDetailComponent } from './system-detail/system-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    SystemsListComponent,
    NewSystemComponent,
    SystemDetailComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [DaedalusService],
  bootstrap: [AppComponent],
  exports: [
    RouterModule
  ]
})
export class AppModule { }
