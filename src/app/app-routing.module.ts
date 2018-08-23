import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewSystemComponent } from './new-system/new-system.component';
import { SystemsListComponent } from './systems-list/systems-list.component';
import { SystemDetailComponent } from './system-detail/system-detail.component';
import {NewDatasetComponent} from './new-dataset/new-dataset.component';


const appRoutes: Routes = [
  { path: 'systems', component: SystemsListComponent },
  { path: 'systems/new', component: NewSystemComponent },
  { path: 'systems/:id', component: SystemDetailComponent },
  { path: 'systems/:id/datasets/new', component: NewDatasetComponent },
  { path: '',
    redirectTo: '/systems',
    pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
