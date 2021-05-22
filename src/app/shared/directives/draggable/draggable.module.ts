import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DraggableDirective } from './draggable.directive';

import { SortableDirective } from './sortable.directive';
import { SortableListDirective } from './sortable-list.directive';

@NgModule({
  imports: [
    CommonModule,

  ],
  declarations: [
    DraggableDirective,
    SortableDirective,
    SortableListDirective
  ],
  exports: [
    DraggableDirective,
    SortableListDirective,
    SortableDirective
  ]
})
export class DraggableModule { }
