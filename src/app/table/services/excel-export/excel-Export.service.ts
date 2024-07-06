import * as XLSX from 'xlsx';
import { Injectable } from '@angular/core';
import { TableService, FilterService } from '@TableServices';

@Injectable({
  providedIn: 'root',
})
export class ExcelExportService {
  constructor(
    private tableService: TableService,
    private filterService: FilterService
  ) {}

  generateExcel(dataArray: any[], mainData: any[], filename: string): void {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([], {
      header: mainData.map((item) => item.name),
    });
    dataArray.forEach((data) => {
      const rowData: any[] = [];
      mainData.forEach((item) => {
        const value = this.getPropertyValue(data, item.key);
        rowData.push(value);
      });
      XLSX.utils.sheet_add_aoa(ws, [rowData], { origin: -1 });
    });
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
    XLSX.writeFile(wb, `${filename}.xlsx`);
  };

  private getPropertyValue(
    obj: any,
    key: string | { [key: string]: string }
  ): any {
    if (typeof key === 'string') {
      const keys = key.split('.');
      let value = obj;
      keys.forEach((k) => {
        value = value[k];
      });
      return value;
    } else if (typeof key === 'object') {
      return this.getPropertyValue(obj[key['grad1']], key['grad2']);
    }
    return null;
  };
  exportToExcel() {
    this.generateExcel(
      this.filterService.filtredData,
      this.tableService.mainDataControle.filter((item: any) => {
        return !this.tableService.hiddenCols.includes(item.name);
      }),
      'List'
    );
  };
}
