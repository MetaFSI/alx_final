import { Component, OnInit, Input, ElementRef} from '@angular/core';
import { ExcelImportService, ExcelExportService, CalculatorService,FilterService,KeyboardService, TableService, FilterHistoryService} from '@TableServices';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss'],
})
export class ToolBarComponent implements OnInit {
  @Input() tableElement!: ElementRef;
  @Input() sum: number = 0;
  @Input() key: string = '';
  //service links
  element: any;
  tableService: any;
  index = 1;
  // col controle
  colControle: boolean = true;
  keyboardService!: KeyboardService;
  filterService!: FilterService;
  exImportService!: ExcelImportService;
  exExportService!: ExcelExportService;
  calculatorService!:CalculatorService
  filterHistory!:FilterHistoryService
  constructor(
    private cdr: ChangeDetectorRef,
    private table:TableService,
    private filter:FilterService,
    private keyboard:KeyboardService,
    private importEx:ExcelImportService,
    private exportEx:ExcelExportService,
    private calculator:CalculatorService,
    private filterHistoryService:FilterHistoryService
  ) {}
  ngOnInit() {
    this.tableService = this.table
    this.keyboardService = this.keyboard
    this.filterService = this.filter
    this.exImportService = this.importEx
    this.exExportService = this.exportEx
    this.calculatorService = this.calculator
    this.filterHistory=this.filterHistoryService
  }

  colHandler(arrHandler: string, item: any) {
    const filterResult = this.tableService.mainData.findIndex(
      (obj: any) => obj.name === item.name
    );
    if (arrHandler === 'remove') {
      this.tableService.hiddenCols.push(item.name);
      this.tableService.mainData.splice(filterResult, 1);
    } else {
      let indexToRemove = this.tableService.hiddenCols.indexOf(item.name);
      this.tableService.hiddenCols.splice(indexToRemove, 1);
      this.tableService.mainData.push(item);
    }
    this.tableService.updateMainData();
    this.tableElement.nativeElement.focus();
  }
  savehandler(): boolean {
    return this.tableService.temporaryArray.some(
      (item: any) => item.value !== ''
    );
  }
  calculatorHandler() {
    this.calculatorService.calculator = !this.calculatorService.calculator;
    if (this.calculatorService.calculator === false) {
      this.calculatorService.clearCalculator();
    }
  }

  col_Controle() {
    this.colControle = !this.colControle;
  }
  isHidden(name: string): boolean {
    return this.tableService.hiddenCols.map((obj: any) => obj).includes(name);
  }
  pinHanlder() {
    this.tableService.pined = !this.tableService.pined;
    this.tableElement.nativeElement.focus();
  }
  keyboardHandler() {
    this.keyboardService.keyboard = !this.keyboardService.keyboard;
    this.tableElement.nativeElement.focus();
  }
  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
}
