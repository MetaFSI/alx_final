import { Component, OnInit, ElementRef,Input,ChangeDetectorRef, ViewChild } from '@angular/core';
import {CalculatorService ,KeyboardService ,DragDropService ,PaginationService,FilterService, TableService, SelectionService } from '@TableServices'
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {
  @ViewChild('myTable') tableElement!: ElementRef;
  @Input() mainDataControle: any;
  @Input() mainData: any;
  @Input() data: any;
  //services links
  tableService!: TableService;
  filterService!:FilterService;
  paginationService!:PaginationService;
  dragDropService!:DragDropService;
  keyboardService!:KeyboardService;
  calculator!:CalculatorService
  selection!:SelectionService

  constructor(
    private tableService_: TableService,
    private filterservice_: FilterService,
    private paginationService_: PaginationService,
    private dragDrop_:DragDropService,
    private keybordService_:KeyboardService,
    private calculatorService:CalculatorService,
    private selectionService:SelectionService,
    private cdr: ChangeDetectorRef,
  ) {}
  
  ngOnInit() {
    this.tableService = this.tableService_;
    this.filterService = this.filterservice_;
    this.paginationService = this.paginationService_;
    this.keyboardService=this.keybordService_;
    this.dragDropService=this.dragDrop_;
    this.tableService_.getData(this.data,this.mainData,this.mainDataControle);
    this.filterservice_.filterInputHandler();
    this.filterservice_.applyFilter(this.data);
    this.filterservice_.getData(this.data);
    this.calculator=this.calculatorService;
    this.selection=this.selectionService;
  }
  idTrigger(id: number) {console.log(id)}
  ngAfterViewInit() {
    this.tableElement.nativeElement.focus(); 
    this.keybordService_.getFocusedElement(this.tableElement);
    this.cdr.detectChanges();
  }
}
