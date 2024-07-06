import { NgModule } from '@angular/core';
import { CalculatorService, FilterService, KeyboardService, MovingService, PaginationService, TableService } from '@TableServices';


@NgModule({
  providers:
  [
    MovingService,
    TableService,
    FilterService,
    PaginationService,
    KeyboardService,
    CalculatorService
  ]
})
export class TableServicesModule { }
