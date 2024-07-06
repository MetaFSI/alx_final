import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AngularDraggableModule } from 'angular2-draggable';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableComponent } from '../table.component';
import { FilterComponent, FilterHistoryComponent, PaginationComponent, ToolBarComponent, AlertComponent } from '@TableComponenets';
import { TableServicesModule } from './table-services/table-services.module';

@NgModule({
  declarations: 
  [
    TableComponent,
    FilterComponent,
    FilterHistoryComponent,
    ToolBarComponent,
    PaginationComponent,
    AlertComponent
  ],
  imports: 
  [
    CommonModule,
    FormsModule,
    DragDropModule,
    AngularDraggableModule,
    BrowserAnimationsModule,
    TableServicesModule
  ],
  providers: [],
    exports:
    [ 
      TableComponent,
      FilterComponent,
      FilterHistoryComponent,
      ToolBarComponent,
      PaginationComponent,
      AlertComponent
    ]
})
export class TableModule { }
