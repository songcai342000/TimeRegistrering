import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { ListComponent } from './list/list.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


@NgModule({
  declarations: [SearchComponent, ListComponent],
  imports: [
    CommonModule
  ],
  exports: [SearchComponent, ListComponent]
})
export class SearchDashboardModule { }
