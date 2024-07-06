import { Injectable } from '@angular/core';
import { FilterService, SelectionService } from '@TableServices';

@Injectable({
  providedIn: 'root'
})
export class FilterHistoryService {
  savedFilters: any[] = [];
  previousFilterState: any[] = [];
  filterHistory: boolean = false;

  id: number = 0;
  filterSaved: boolean = false;
  saveFilterIcon: boolean = false;
  selectionFilter: boolean = false;


  arrayOfIdsContainer: any = [];


  content: boolean = true;
  checkbox: boolean = false;

  constructor(private filterService:FilterService,private selectionService:SelectionService) { 
    this.getUpdateFilterInput();
    this.id = this.savedFilters.length;
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
    const deepCopyArray = JSON.parse(JSON.stringify(this.filterService.filterInput));
    if (!this.isFilterStateChanged(deepCopyArray)) {
      return;
    }
    if (this.filterService.filterInput.filter((item) => item.content !== '').length > 0) {
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
    if (this.selectionService.arrayOfIds.length > 0) {
      this.arrayOfIdsContainer.push({
        date: this.getCurrentDate(),
        time: this.getCurrentTime(),
        array: this.selectionService.arrayOfIds,
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
    this.selectionService.arrayOfIds = array;
    this.filterService.applyFilter(this.filterService.filtredData);
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
      this.filterService.filterInput.forEach((item) => (item.content = ''));
      this.updateFilterInput();
      this.filterService.applyFilter(this.filterService.getTableService().data);
    } else {
      this.arrayOfIdsContainer.splice(id, 1);
      this.selectionService.arrayOfIds = [];
      this.updateIDsContairer();
      this.selectionService.isChecked = false;
      this.filterService.applyFilter(this.filterService.getTableService().data);
    }
  }
  fhClear(option: any) {
    if (option === 'content') {
      this.savedFilters = [];
      this.filterService.filterInput.forEach((item) => (item.content = ''));
      this.updateFilterInput();
      this.filterService.applyFilter(this.filterService.getTableService().data);
    } else {
      this.arrayOfIdsContainer = [];
      this.selectionService.arrayOfIds = [];
      this.updateIDsContairer();
      this.selectionService.isChecked = false;
      this.filterService.applyFilter(this.filterService.getTableService().data);
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
      this.filterService.filterInput = array;
      this.selectionService.arrayOfIds = [];
      this.selectionService.isChecked = false;
    } else {
      this.selectionService.arrayOfIds = array;
      this.selectionService.isChecked = true;
      this.filterService.filterInput.forEach((item) => (item.content = ''));
    }
    this.filterService.applyFilter(this.filterService.getTableService().data);
  }
}
