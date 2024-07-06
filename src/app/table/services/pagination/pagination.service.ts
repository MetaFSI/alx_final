import { Injectable, Injector } from '@angular/core';
import { FilterService } from '@TableServices';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  // pagination
  visibleArray: any = [];
  currentIndex = 0;
  visibleItems = '15';
  visiblePage = 1;
  PagesOptionsArray: number[] = [];
  constructor(private injector: Injector) {
    this.pagesSwitch()
  }
  getFilteService(): FilterService {
    return this.injector.get(FilterService);
  }
  pagesSwitch() {
    const numberOfOptions = Math.ceil(
      this.getFilteService().filtredData?.length / Number(this.visibleItems)
    );
    this.PagesOptionsArray = Array.from(
      { length: numberOfOptions },
      (_, index) => index + 1
    );
  }
  paginationHandling(array: any) {
    const startIndex = this.currentIndex;
    const endIndex = startIndex + Number(this.visibleItems);
    this.visibleArray = array?.slice(startIndex, endIndex);
  }
  nextPage() {
    const lastIndex = this.getFilteService().filtredData.length - 1;
    if (lastIndex - this.currentIndex >= Number(this.visibleItems)) {
      this.currentIndex = Math.min(this.currentIndex + Number(this.visibleItems), lastIndex);
      this.visiblePage = Math.ceil((this.currentIndex + 1) / Number(this.visibleItems)); // Update here
    }
    this.paginationHandling(this.getFilteService().filtredData);
  }
  prevPage() {
    if (this.currentIndex >= Number(this.visibleItems)) {
      this.currentIndex = Math.max(this.currentIndex - Number(this.visibleItems), 0);
      this.visiblePage = Math.ceil((this.currentIndex + 1) / Number(this.visibleItems)); // Update here
    }
    this.paginationHandling(this.getFilteService().filtredData);
  }
  onSelectChange(Name: string) {
    if (Name === 'rows') {
      this.currentIndex = Math.min(this.currentIndex, this.getFilteService().filtredData.length - 1);
      this.paginationHandling(this.getFilteService().filtredData);
      this.visiblePage = Math.ceil((this.currentIndex + 1) / Number(this.visibleItems));
    } else if (Name === 'pages') {
      this.currentIndex =
        Number(this.visibleItems) * Number(this.visiblePage) - Number(this.visibleItems);
      this.currentIndex = Math.min(this.currentIndex, this.getFilteService().filtredData.length - 1);
      this.paginationHandling(this.getFilteService().filtredData);
    }
    this.pagesSwitch();
  }
}
