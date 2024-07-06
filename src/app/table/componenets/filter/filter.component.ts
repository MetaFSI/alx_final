import { ChangeDetectorRef, Component, ElementRef, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
  TableService,
  FilterService,
  FilterHistoryService,
} from '@TableServices';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  @Input() index!: number;
  @Input() item: any;
  tableService!: TableService;
  filterService!: FilterService;
  element: any;
  selectedOption: string | null = null;
  colName: string | null = null;
  show = false;
  showModal = false;

  constructor(
    private elementRef: ElementRef,
    private table_: TableService,
    private sanitizer: DomSanitizer,
    private filter_: FilterService,
    private filterHistoryService: FilterHistoryService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.element = this.elementRef;
    this.tableService = this.table_;
    this.filterService = this.filter_;
  }
  filterExHandler() {
    if (this.filter_.filterInput.some((item) => item.content !== '')) {
      this.filterHistoryService.saveFilterIcon = true;
    } else {
      this.filterHistoryService.saveFilterIcon = false;
    }
  }
  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
  selectOption(option: string, name: string) {
    this.selectedOption = option;
    this.colName = name;
  }
  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
}
