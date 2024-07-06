import { Injectable, Injector } from '@angular/core';
import { TableService,PaginationService,CalculatorService, SelectionService } from '@TableServices';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  data: any = [];
  // filter handling
  filtredData: any[] = [];
  filterInput: any[] = [];
  constructor(private injector: Injector) {}
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
  getSelectionService(): SelectionService {
    return this.injector.get(SelectionService );
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
                console.log( this.getTableService().formatDateString(itemValue),'|',content,'|',filterResult.type)
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
      } else if (this.getSelectionService().arrayOfIds.length > 0) {
        this.filtredData = this.filtredData.filter((item: any) => {
          return this.getSelectionService().arrayOfIds.includes(item.id);
        });
      }
    });
    this.getPaginationService().pagesSwitch();
    this.getPaginationService().currentIndex = 0;
    this.getPaginationService().visiblePage = 1;
    this.getPaginationService().paginationHandling(this.filtredData);
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
      this.getSelectionService().arrayOfIds = item;
    }
    this.applyFilter(this.getTableService().data);console.log(this.filterInput)
  }
  filterEqual(itemValue: any, content: any, filterResult: any): boolean {
    if (this.getTableService().isString(filterResult?.key)) {
      if(filterResult.type!=='date'){
        return (itemValue === (filterResult.type === 'number' ? Number(content) : content));
      }else {
        return this.getTableService().formatDateString(itemValue)===content
      } 
    }else {
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
}
