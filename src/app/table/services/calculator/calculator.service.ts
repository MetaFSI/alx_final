import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { FilterService, SelectionService, TableService } from '@TableServices';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  // calculation
  header: any = {};
  sum: number = 0;
  ids: any = [];
  objects: any[] = [];
  refresh: boolean = false;
  calculator: boolean = false;
  // generate
  amount = null;
  range = null;
  start: boolean = true;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private tableService: TableService,
    private filterService: FilterService,
    private selectionService:SelectionService
  ) {}

  headerClick(header: any) {
    if (this.header.name !== header.name) {
      if (header.type === 'number' && this.calculator) {
        this.header = header;
        this.sum = 0;
        let s = this.calculateSum(this.objects, this.header.key);
        this.sum = s;
      }
    } else {
      this.clearCalculator();
    }
  }
  findItems(items: any, targetAmount: number, range: number, priceKey: any) {
    const getRandomSubset = () => {
      const itemsCopy = [...items];
      const subset = [];
      let remainingAmount = targetAmount;

      while (remainingAmount > 0 && itemsCopy.length > 0) {
        const randomIndex = Math.floor(Math.random() * itemsCopy.length);
        const selectedItem = itemsCopy[randomIndex];
        const itemPrice =
          priceKey instanceof Object
            ? selectedItem[priceKey.grad1][priceKey.grad2]
            : selectedItem[priceKey];

        if (itemPrice <= remainingAmount) {
          subset.push(selectedItem);
          remainingAmount -= itemPrice;
        }

        itemsCopy.splice(randomIndex, 1);
      }
      return subset;
    };

    let result;
    while (!result) {
      const subset = getRandomSubset();
      const subsetSum = subset.reduce((sum, item) => {
        const itemPrice =
          priceKey instanceof Object
            ? item[priceKey.grad1][priceKey.grad2]
            : item[priceKey];
        return sum + itemPrice;
      }, 0);

      if (subsetSum >= targetAmount - range && subsetSum <= targetAmount) {
        result = subset;
      }
    }
    return result;
  }
  clearCalculator() {
    this.header = {};
    this.sum = 0;
    this.ids = [];
    this.objects = [];
    this.amount = null;
    this.range = null;
  }
  done() {
    this.selectionService.isChecked = false;
    this.start = !this.start;
    this.selectionService.arrayOfIds = [];
    this.clearCalculator();
    this.applyFilters(this.filterService.data)
  }

  generateItems() {
    if (
      this.amount !== null &&
      this.range !== null &&
      Object.keys(this.header).length !== 0
    ) {
      this.tableService.data = this.findItems(
        this.filterService.filtredData,
        this.amount,
        this.range,
        this.header.key
      );
      this.applyFilters(this.tableService.data)
      this.start = !this.start;
      this.sum = this.calculateSum(
        this.filterService.filtredData,
        this.header.key
      );
    }
  }

  getItem(object: any, item: any) {
    if (this.header.name === item.name && this.calculator) {
      const index = this.objects.findIndex(
        (element: any) => element.id === object.id
      );
      if (this.selectionService.arrayOfIds.length === 0) {
        if (index === -1) {
          this.objects.push(object);
          this.ids.push(object.id);
        } else {
          this.objects.splice(index, 1);
          this.ids.splice(
            this.ids.findIndex((x: any) => x === object.id),
            1
          );
        }
      } else {
        if (this.selectionService.arrayOfIds.includes(object.id)) {
          this.selectionService.arrayOfIds.splice(
            this.selectionService.arrayOfIds.findIndex(
              (x: any) => x === object.id
            ),
            1
          );
          this.ids = this.selectionService.arrayOfIds;
          this.objects.splice(index, 1);
        } else if (
          !this.selectionService.arrayOfIds.includes(object.id) &&
          object.id
        ) {
          this.selectionService.arrayOfIds.push(object.id);
          this.objects.push(object);
        }
        this.refresh = true;
      }
      let s = this.calculateSum(this.objects, this.header.key);
      this.sum = s;
    }
  }
  calculateSum(objects: any[], headerKey: any): number {
    if (this.filterService.isString(headerKey)) {
      return objects.reduce((sum, obj) => sum + Number(obj[headerKey]), 0);
    } else if (this.tableService.isObjectWithTwoKeys(headerKey)) {
      return objects.reduce(
        (sum, obj) => sum + Number(obj[headerKey.grad1][headerKey.grad2]),
        0
      );
    } else {
      return objects.reduce(
        (sum, obj) =>
          sum + Number(obj[headerKey.grad1][headerKey.grad2][headerKey.grad3]),
        0
      );
    }
  }
  markUp(itemId: any, name: any): boolean {
    if (this.calculator) {
      if (this.selectionService.arrayOfIds.length === 0) {
        return (
          this.ids.some((id: any) => id === itemId) && name === this.header.name
        );
      } else {
        return (
          this.selectionService.arrayOfIds.some((id: any) => id === itemId) &&
          name === this.header.name
        );
      }
    } else {
      return false;
    }
  }
  isColorThemeLight() {
    const colorTheme =this.document.defaultView?.localStorage.getItem('color-theme');
    return colorTheme === 'light';
  }
  applyFilters(data: any) {
    this.filterService.applyFilter(data);
  }  
}
