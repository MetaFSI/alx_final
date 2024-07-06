import { Injectable, Injector } from '@angular/core';
import { TableService,PaginationService,CalculatorService } from '@TableServices';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  data: any = [];
  // filter handling
  filtredData: any[] = [];
  filterInput: any[] = [];
  savedFilters: any[] = [];
  previousFilterState: any[] = [];
  filterHistory: boolean = false;
  id: number = 0;
  filterSaved: boolean = false;
  saveFilterIcon: boolean = false;
  selectionFilter: boolean = false;

  arrayOfIds: any = [];
  arrayOfIdsContainer: any = [];

  isChecked: boolean = false;
  content: boolean = true;
  checkbox: boolean = false;



  constructor(private injector: Injector) {
    this.getUpdateFilterInput();
    this.id = this.savedFilters.length;
  }
  getData(data: any) {
    this.data = data;
  }
  getCalculatorService(): CalculatorService{
    return this.injector.get(CalculatorService);
  }
  getPaginationService(): PaginationService {
    return this.injector.get(PaginationService);
  }
  getTableService(): TableService {
    return this.injector.get(TableService);
  }
  filterInputHandler() {
    this.getTableService().mainDataControle?.forEach((item: any) => {
      this.filterInput.push({ inputName: item.name, content: '', option: '' });
    });
  }
  
  sort(filtringItem: any, keys: any) {
    this.getTableService().data = this.getTableService()
      .data.slice()
      .sort((item: any, item2: any) => {
        const itemValue = item[filtringItem?.key];
        const itemValue2 = item2[filtringItem?.key];
        switch (keys) {
          case 'aTOz':
            if (this.getTableService().isString(filtringItem?.key)) {
              if (filtringItem?.type === 'number') {
                return itemValue2 - itemValue;
              } else {
                return itemValue.localeCompare(itemValue2);
              }
            } else if (!this.getTableService().isString(filtringItem?.key)) {
              if (filtringItem?.type === 'number') {
                return (
                  item2[filtringItem['key']?.grad1][
                    filtringItem['key']?.grad2
                  ] -
                  item[filtringItem['key']?.grad1][filtringItem['key']?.grad2]
                );
              } else {
                return item[filtringItem['key']?.grad1][
                  filtringItem['key']?.grad2
                ].localeCompare(
                  item2[filtringItem['key']?.grad1][filtringItem['key']?.grad2]
                );
              }
            }
            break;
          case 'zTOa':
            if (this.getTableService().isString(filtringItem?.key)) {
              if (filtringItem?.type === 'number') {
                return itemValue - itemValue2;
              } else {
                return itemValue2.localeCompare(itemValue);
              }
            } else if (!this.getTableService().isString(filtringItem?.key)) {
              if (filtringItem?.type === 'number') {
                return (
                  item[filtringItem['key']?.grad1][filtringItem['key']?.grad2] -
                  item2[filtringItem['key']?.grad1][filtringItem['key']?.grad2]
                );
              } else {
                return item2[filtringItem['key']?.grad1][
                  filtringItem['key']?.grad2
                ].localeCompare(
                  item[filtringItem['key']?.grad1][filtringItem['key']?.grad2]
                );
              }
            }
            break;
          default:
            break;
        }
        return true;
      });
  }
  applyFilter(array: any) {
    this.filtredData = array;
    this.filterInput.forEach((filterResult) => {
      const filterKey = filterResult?.key;

      if (filterKey) {
        this.filtredData = this.filtredData.filter((item: any) => {
          const itemValue = this.getNestedValue(item, filterKey);
          const content = filterResult?.content;

          if (filterResult && content !== '') {
            switch (filterResult?.option) {
              case 'equal':
                return this.filterEqual(itemValue, content, filterResult);
              case 'startWith':
                return this.filterStartsWith(itemValue, content);
              case 'endWith':
                return this.filterEndsWith(itemValue, content);
              case 'greater':
                return this.filterGreater(itemValue, content);
              case 'lower':
                return this.filterLower(itemValue, content);
              default:
                break;
            }
          }
          return true;
        });
      } else if (this.arrayOfIds.length > 0) {
        this.filtredData = this.filtredData.filter((item: any) => {
          return this.arrayOfIds.includes(item.id);
        });
      }
    });
    this.getPaginationService().pagesSwitch();
    this.getPaginationService().currentIndex = 0;
    this.getPaginationService().visiblePage = 1;
    this.getPaginationService().paginationHandling(this.filtredData);
    // this.sumOfAll();
  }
  filterOptionHandler(option: string, item: any) {
    const index = this.findIndexByName(item.name);
    if (option === 'rest') {
      this.filterInput[index].option = '';
      this.filterInput[index].content = '';
    } else if (option === 'aTOz' || option === 'zTOa') {
      this.sort(item, option);
    } else if (option !== 'only') {
      this.filterInput[index] = {
        ...this.filterInput[index],
        ...item,
        option: option,
      };
    } else {
      this.arrayOfIds = item;
    }
    this.applyFilter(this.getTableService().data);
  }
  filterEqual(itemValue: any, content: any, filterResult: any): boolean {
    if (this.getTableService().isString(filterResult?.key)) {
      return (
        itemValue ===
        (filterResult.type === 'number' ? Number(content) : content)
      );
    } else {
      return itemValue === content;
    }
  }
  filterStartsWith(itemValue: any, content: any): boolean {
    return this.isString(itemValue) && itemValue.startsWith(content);
  }
  filterEndsWith(itemValue: any, content: any): boolean {
    return this.isString(itemValue) && itemValue.endsWith(content);
  }
  filterGreater(itemValue: any, content: any): boolean {
    return itemValue > Number(content);
  }
  filterLower(itemValue: any, content: any): boolean {
    return itemValue < Number(content);
  }
  findIndexByName(nameToFind: string): number {
    return this.filterInput.findIndex(
      (item: any) => item.inputName === nameToFind
    );
  }
  isString(value: any): boolean {
    return typeof value === 'string' || value instanceof String;
  }
  getNestedValue(
    obj: any,
    path: string | { grad1: string; grad2: string; grad3?: string }
  ): any {
    if (typeof path === 'string') {
      return obj[path];
    } else if (path && typeof path === 'object' && path.grad1 && path.grad2) {
      if (path.grad3) {
        return obj[path.grad1] && obj[path.grad1][path.grad2]
          ? obj[path.grad1][path.grad2][path.grad3]
          : undefined;
      } else {
        return obj[path.grad1] && obj[path.grad1][path.grad2]
          ? obj[path.grad1][path.grad2]
          : undefined;
      }
    } else {
      return undefined;
    }
  }

















  getCurrentTime(): string {
    const now = new Date();
    let hours = now.getHours();
    let minutes: string | number = now.getMinutes();
    const meridiem = hours >= 12 ? ' PM' : ' AM';
    hours = hours % 12 || 12;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${minutes}${meridiem}`;
  }
  getCurrentDate(): string {
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const year = now.getFullYear();
    return `${month}/${day}/${year}`;
  }


  saveFilter() {
    const deepCopyArray = JSON.parse(JSON.stringify(this.filterInput));
    if (!this.isFilterStateChanged(deepCopyArray)) {
      return;
    }
    if (this.filterInput.filter((item) => item.content !== '').length > 0) {
      this.savedFilters.push({
        id: this.savedFilters.some((item) => item.id === this.id)
          ? this.id + 'a'
          : this.id,
        date: this.getCurrentDate(),
        time: this.getCurrentTime(),
        array: deepCopyArray,
      });
      this.filterSaved = true;
      this.filterHistory = true;
      setTimeout(() => {
        this.filterSaved = false;
        this.filterHistory = false;
      }, 3000);
      this.id++;
    }
    this.previousFilterState = deepCopyArray;
    this.updateFilterInput();
  }
  saveArrayofIds() {
    if (this.arrayOfIds.length > 0) {
      this.arrayOfIdsContainer.push({
        date: this.getCurrentDate(),
        time: this.getCurrentTime(),
        array: this.arrayOfIds,
      });
      this.updateIDsContairer();
    }
  }
  updateIDsContairer() {
    localStorage.setItem(
      'selectedRows',
      JSON.stringify(this.arrayOfIdsContainer)
    );
  }
  filterBySelected(array: any) {
    this.arrayOfIds = array;
    this.applyFilter(this.filtredData);
  }


  isFilterStateChanged(currentState: any[]): boolean {
    return (
      JSON.stringify(currentState) !== JSON.stringify(this.previousFilterState)
    );
  }


  updateFilterInput(): void {
    localStorage.setItem('filters', JSON.stringify(this.savedFilters));
  }

  fhRemove(option: any, id: number) {
    if (option === 'content') {
      const index = this.savedFilters.findIndex((item) => item.id === id);
      this.savedFilters.splice(index, 1);
      this.filterInput.forEach((item) => (item.content = ''));
      this.updateFilterInput();
      this.applyFilter(this.getTableService().data);
    } else {
      this.arrayOfIdsContainer.splice(id, 1);
      this.arrayOfIds = [];
      this.updateIDsContairer();
      this.isChecked = false;
      this.applyFilter(this.getTableService().data);
    }
  }
  fhClear(option: any) {
    if (option === 'content') {
      this.savedFilters = [];
      this.filterInput.forEach((item) => (item.content = ''));
      this.updateFilterInput();
      this.applyFilter(this.getTableService().data);
    } else {
      this.arrayOfIdsContainer = [];
      this.arrayOfIds = [];
      this.updateIDsContairer();
      this.isChecked = false;
      this.applyFilter(this.getTableService().data);
    }
  }

  getUpdateFilterInput() {
    const savedFilterInput = localStorage.getItem('filters');
    if (savedFilterInput) {
      this.savedFilters = JSON.parse(savedFilterInput);
    }
    const savedIdContainer = localStorage.getItem('selectedRows');
    if (savedIdContainer) {
      this.arrayOfIdsContainer = JSON.parse(savedIdContainer);
    }
  }
  selectedFilterFromHistory(option: any, array: any) {
    if (option === 'content') {
      this.filterInput = array;
      this.arrayOfIds = [];
      this.isChecked = false;
    } else {
      this.arrayOfIds = array;
      this.isChecked = true;
      this.filterInput.forEach((item) => (item.content = ''));
    }
    this.applyFilter(this.getTableService().data);
  }
}
