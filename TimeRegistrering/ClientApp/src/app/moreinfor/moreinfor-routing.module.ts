import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoreinforComponent } from './moreinfor.component';


const routes: Routes = [{ path: '', component:MoreinforComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoreinforRoutingModule { }
