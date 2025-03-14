import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { ListingsComponent } from './listings.component';

const routes: Routes = [
  { path: '', component: ListingsComponent }
];

@NgModule({
  declarations: [ListingsComponent],
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule.forChild(routes)
  ]
})
export class ListingsModule { }