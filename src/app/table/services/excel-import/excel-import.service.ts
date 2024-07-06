import * as XLSX from 'xlsx';
import { Injectable } from '@angular/core';
import { TableService, FilterService, CalculatorService } from '@TableServices';

@Injectable({
  providedIn: 'root',
})
export class ExcelImportService {
  status = 'inner';
  excelData: any = [];
  excelMainData: any = [];
  originalData: any = [];
  originalMainData: any = [];
  upload: boolean = true;
  apply: boolean = false;
  clear: boolean = false;
  fileName: string = '';
  dropDown: boolean = false;
  constructor(
    private tableService: TableService,
    private filterService: FilterService,
    private calculatorService: CalculatorService
  ) {}

  async onFileChange(event: any): Promise<void> {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      const fileName = file.name;
      event.target.value = null;

      try {
        this.status = 'outer';
        const dataArray = await this.excelToArray(file);
        this.fileName = fileName;
        this.excelData = dataArray.data;
        this.excelMainData = dataArray.mainData;
        this.originalMainData = this.tableService.mainDataControle;
        this.originalData = this.tableService.data;
        this.upload = !this.upload;
        this.apply = !this.apply;
      } catch (error) {
        console.error('Error reading Excel file:', error);
      }
    }
  }

  async excelToArray(file: File): Promise<{ data: any[]; mainData: any[] }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        try {
          const data = event.target.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData: any[] = XLSX.utils.sheet_to_json(sheet, {
            header: 1,
          });
          if (!jsonData || jsonData.length === 0) {
            reject('No data found in the Excel sheet.');
            return;
          }
          const headers: string[] = jsonData[0];
          const processedData = jsonData
            .slice(1)
            .map((row: any, index: number) => {
              const obj: any = { id: row.id || index + 1 };
              headers.forEach((header: string, index: number) => {
                const transformedHeader = header.replace(/\s+/g, '_');
                obj[transformedHeader] = row[index];
              });
              if (obj.name) {
                obj.shortName = this.generateShortName(obj.name);
              }
              return obj;
            });
          const mainData = headers.map((header: string, index: number) => {
            const transformedHeader = header.replace(/\s+/g, '_');
            const type = this.inferType(processedData, transformedHeader);
            const shortName = this.generateShortName(header);
            return {
              id: index,
              name: header,
              type,
              key: transformedHeader,
              shortName,
            };
          });
          const result = { data: processedData, mainData };
          resolve(result);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsBinaryString(file);
    });
  }
  appyExcel() {
    this.filter_Apply_Input(this.excelData, this.excelMainData, 'outer');
    this.excelData = [];
    this.excelMainData = [];
    this.apply = !this.apply;
  }
  clearExcel() {
    this.filter_Apply_Input(this.originalData, this.originalMainData, 'inner');
    this.filterService.filterInput = [];
    this.calculatorService.clearCalculator();
    this.upload = !this.upload;
    this.fileName = '';
  }
  filter_Apply_Input(data: any, maindata: any, status: any) {
    this.clear = !this.clear;
    this.tableService.data = data;
    this.tableService.mainData = maindata;
    this.tableService.mainDataControle = maindata;
    this.filterService.filterInputHandler();
    this.filterService.applyFilter(this.tableService.data);
    this.status = status;
  }
  generateShortName(name: string): string {
    const words = name.split(/\s+/);
    if (words.length > 1) {
      return words.map((word) => word[0].toUpperCase()).join('');
    } else {
      return name.slice(0, 3).toUpperCase();
    }
  }
  private inferType(data: any[], header: string): string {
    const value = data.find((row) => row[header]);
    if (value) {
      if (this.isDateFormat(value[header])) {
        return 'date';
      } else if (typeof value[header] === 'number') {
        return 'number';
      } else {
        return 'text';
      }
    }
    return 'text';
  }
  private isDateFormat(value: any): boolean {
    const dateFormatRegex = /^\d{4}([./-])\d{2}\1\d{2}$/;
    return dateFormatRegex.test(value);
  }
}
