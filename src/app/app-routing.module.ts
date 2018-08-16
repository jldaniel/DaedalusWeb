import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewSystemComponent } from './new-system/new-system.component';
import {SystemsListComponent} from './systems-list/systems-list.component';


const appRoutes: Routes = [
  { path: 'systems', component: SystemsListComponent },
  { path: 'systems/new', component: NewSystemComponent },
  { path: '',
    redirectTo: '/systems',
    pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
