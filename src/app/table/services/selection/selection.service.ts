import { Injectable, Injector } from '@angular/core';
import {
  CalculatorService,
  FilterHistoryService,
  FilterService,
  TableService,
} from '@TableServices';

@Injectable({
  providedIn: 'root',
})
export class SelectionService {
  arrayOfIds: any = [];
  isChecked: boolean = false;
  constructor(private injector: Injector) {}
  getCalculatorService(): CalculatorService {
    return this.injector.get(CalculatorService);
  }
  getTableService(): TableService {
    return this.injector.get(TableService);
  }
  getSelectionService(): SelectionService {
    return this.injector.get(SelectionService);
  }
  getFilterService(): FilterService {
    return this.injector.get(FilterService);
  }
  getFilterHistoryService(): FilterHistoryService {
    return this.injector.get(FilterHistoryService);
  }
  checkBoxHandler(id: any) {
    if (this.arrayOfIds.includes(id)) {
      this.arrayOfIds.splice(
        this.arrayOfIds.findIndex((item: number) => {
          return item === id;
        }),
        1
      );
    } else {
      this.arrayOfIds.push(id);
    }
  }
  onCheckboxChange() {
    if (this.isChecked === true && this.arrayOfIds.length > 0) {
      this.getFilterService().filterOptionHandler('only', this.arrayOfIds);
      this.getFilterHistoryService().selectionFilter = true;
    } else if (this.isChecked === false && this.arrayOfIds.length > 0) {
      this.getFilterHistoryService().selectionFilter = false;
      this.arrayOfIds = [];
      if (this.getCalculatorService().ids.length === 0) {
        this.getCalculatorService().objects = [];
        this.getCalculatorService().sum = 0;
      }
      this.getFilterService().filterOptionHandler('only', this.arrayOfIds);
    } else if (this.isChecked) {
      if (
        this.getCalculatorService().ids.length > 0 &&
        this.arrayOfIds.length === 0
      ) {
        this.arrayOfIds = this.getCalculatorService().ids;
        this.getFilterService().applyFilter(this.getTableService().data);
      } else {
        this.getFilterService().filtredData.map((item: any) => {
          this.arrayOfIds.push(item.id);
          this.getCalculatorService().objects.push(item);
        });
      }
    } else if (!this.isChecked) {
      this.arrayOfIds = [];
    }
  }
  ischeckBoxChecked(id: any) {
    return this.arrayOfIds.some((item: any) => item === id);
  }
  trackById(index: number, item: any): number {
    return item.id;
  }
}
