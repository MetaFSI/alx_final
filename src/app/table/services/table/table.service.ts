import { Injectable, Injector } from '@angular/core';
import { FilterService } from '@TableServices';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  data: any = [];
  mainData: any = [];
  mainDataControle: any = [];
  filterOptions: any[] = [
    {
      name: 'Rest',
      icon: ` <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
     </svg> `,
      type: 'text',
      value: 'rest',
    },
    {
      name: 'AB...',
      icon: ` <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w- h-5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg> `,
      type: 'text',
      value: 'startWith',
    },
    {
      name: '...DE',
      icon: ` <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 rotate-180">
      <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>`,
      type: 'text',
      value: 'endWith',
    },
    {
      name: 'ABCDE',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6" />
    </svg>  `,
      type: 'text',
      value: 'equal',
    },
    {
      nameA: 'Rest',
      iconA: ` <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
     </svg> `,
      type: 'number',
      valueA: 'rest',
    },
    {
      nameA: 'Equal',
      iconA: `  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
    </svg>  `,
      type: 'number',
      valueA: 'equal',
    },
    {
      nameA: 'Greater',
      iconA: `   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg> `,
      type: 'number',
      valueA: 'greater',
    },
    {
      nameA: 'Lower',
      iconA: ` <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg> `,
      type: 'number',
      valueA: 'lower',
    },
  ];
  hiddenCols: any = [];
  // moving controle
  isDragging = false;
  position!: string;
  // actions visiblity controle
  actions: boolean = false;
  // Filter controle
  pined: boolean = false;
  filter: boolean = false;
  selectedData: any = [];
  temporaryObj: any = {};
  temporaryArray: any = [];
  changes: any = {};
  message: string = '';
  messages: any = [];
  updateAnswer: boolean = false;
  showFilter: boolean = false;
  constructor(private injector: Injector) {
    this.getUpdatedMainData();
  }

  getData(DataArray: any, mainData: any, mainDataControle: any) {
    this.data = DataArray;
    this.mainDataControle = mainDataControle;
    this.mainData = mainData;
  }
  getFilterService(): FilterService {
    return this.injector.get(FilterService);
  }
  getUpdatedMainData() {
    const savedMainData = localStorage.getItem('hiddenItems');
    if (savedMainData) {
      this.hiddenCols = JSON.parse(savedMainData);
    }
  }
  updateMainData(): void {
    localStorage.setItem('hiddenItems', JSON.stringify(this.hiddenCols));
  }
  // Moving Handler
  onMouseDown(event: MouseEvent): void {
    this.isDragging = true;
  }
  onMouseUp(): void {
    this.isDragging = false;
  }
  onMouseMove(event: MouseEvent, ele: any): void {
    if (this.isDragging) {
      const element = ele.nativeElement;
      element.style.left = event.clientX + 'px';
      element.style.top = event.clientY + 'px';
      this.updatePosition(ele);
    }
  }
  updatePosition(ele: any): void {
    const element = ele.nativeElement;
    const x = element.offsetLeft;
    const y = element.offsetTop;
    this.position = `(${x}, ${y})`;
  }

  // Conditional rendring by types
  isString(item: any): boolean {
    return typeof item === 'string';
  }
  isNumber(item: any): boolean {
    return typeof item === 'number';
  }
  isObjectWithTwoKeys(obj: any): boolean {
    return obj && typeof obj === 'object' && Object.keys(obj).length === 2;
  }
  isHidden(name: string): boolean {
    return !this.hiddenCols.map((obj: any) => obj).includes(name);
  }
  optionsSwitcher(option: string) {
    if (option === 'filter') {
      (this.showFilter = !this.showFilter), (this.pined = false);
      this.filter = !this.filter;
    }
    if (option === 'actions') {
      this.actions = !this.actions;
    }
  }
  formatDateString(inputDateString: any) {
    const date = new Date(inputDateString);
    const formattedDate = date.toISOString().split('T')[0];
    return formattedDate;
  }

  getObject(obj: any) {
    if (this.updateAnswer) {
      this.temporaryObj = obj;
      if (this.temporaryArray.length === 0) {
        this.mainData.forEach((item: any) => {
          this.temporaryArray.push({ name: item.name, value: '', key: '' });
        });
      }
    }
  }

  onContentChange(event: any, item: any) {
    const editedContent = event.target.innerText;
    const inputType = event.target.getAttribute('data-input-type');
    const index = this.temporaryArray.findIndex((it: any) => {
      return it.name === item.name;
    });
    switch (inputType) {
      case 'text':
        this.temporaryArray[index].value = editedContent;
        this.temporaryArray[index].key = item.key;
        break;
      case 'number':
        const parsedNumber = parseFloat(editedContent);
        if (!isNaN(parsedNumber)) {
          this.temporaryArray[index].value = parsedNumber;
          this.temporaryArray[index].key = item.key;
        }
        break;
      case 'date':
        this.temporaryArray[index].value = editedContent;
        this.temporaryArray[index].key = item.key;
        break;
      default:
        break;
    }
  }
  update() {
    this.temporaryArray.forEach((item: any) => {
      if (this.isString(item.key)) {
        this.temporaryObj[item.key] = item.value;
      } else if (this.isObjectWithTwoKeys(item.key)) {
        this.temporaryObj[item.key.grad1][item.key.grad2] = item.value;
      } else {
        this.temporaryObj[item.key.grad1][item.key.grad2][item.key.grad3] =
          item.value;
      }
    });
  }

  saveObject() {
    const index = this.data.findIndex(
      (obj: any) => obj.id === this.temporaryObj.id
    );
    this.data[index] = this.temporaryObj;
    this.update();

    if (
      this.temporaryArray.some((item: any) => {
        return item.value !== '';
      })
    ) {
      this.messages.push('Item updated secsessfully!');
      setTimeout(() => {
        this.messages = [];
      }, 3000);
    }
    this.temporaryArray = [];
    this.temporaryObj = {};
    this.getFilterService().applyFilter(this.data);
  }
}
