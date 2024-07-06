import { Injectable,Injector,Renderer2,RendererFactory2   } from '@angular/core';
import { PaginationService,TableService } from '@TableServices';

@Injectable({
  providedIn: 'root'
})
export class KeyboardService {
  elemnt:any;
  keyboard:boolean=false;
  renderer!: Renderer2;
  constructor(
    private paginationService:PaginationService,
    private tableService:TableService,
    private ijct:Injector, 
    private rendererFactory: RendererFactory2 ) {
      this.renderer = this.rendererFactory.createRenderer(null, null);
     }

  getFocusedElement(elemt:any){
      this.elemnt=elemt
  }
  focusedRowIndex: number = 0;
  focusedCellIndex: number = 0;
  handleKeyDown(event: KeyboardEvent) {
    if(this.keyboard){
      switch (event.key) {
        case 'ArrowUp':
          this.moveFocus(-1, 0);
          this.focusRootElement();
          break;
        case 'ArrowDown':
          this.moveFocus(1, 0);
          this.focusRootElement();
          break;
        case 'ArrowLeft':
          this.moveFocus(0, -1);
          this.focusRootElement();
          break;
        case 'ArrowRight':
          this.moveFocus(0, 1);
          this.focusRootElement();
          break;
          case 'Enter':
           this.getTableService().saveObject()
           this.focusRootElement();
          break;
      }
    }
  }
  focusRootElement() {
    if (this.elemnt) {
        this.elemnt.nativeElement.focus();
    }
}


  getTableService(): TableService {
    return this.ijct.get(TableService);
  }
  moveFocus(rowChange: number, cellChange: number) {
    const newRow = this.focusedRowIndex + rowChange;
    const newCell = this.focusedCellIndex + cellChange;

    if (this.isValidIndex(newRow, newCell)) {
      this.focusedRowIndex = newRow;
      this.focusedCellIndex = newCell;
    }
  }

  isValidIndex(row: number, cell: number): boolean {
    const maxRows = this.paginationService.visibleArray.length;
    const maxCells = this.tableService.mainDataControle.length+2;

    return row >= 0 && row < maxRows && cell >= 0 && cell < maxCells;
  }
  handleCheckboxClick(event: Event) {
      event.stopPropagation();
  }
  ngAfterViewInit() {
    this.getFocusedElement(this.elemnt);
  }
  setFocus(rowIndex: number) {
      this.focusedRowIndex = rowIndex;
      this.focusedCellIndex = 0; 
  }
}
