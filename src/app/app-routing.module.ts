import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {ManageDbComponent} from'./manage-db.component/manage-db.component';
import {ShowdbComponent} from './showdb/showdb.component';

const routes: Routes = [
  { path: '', component: ShowdbComponent },
  { path: 'managedb', component: ManageDbComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
