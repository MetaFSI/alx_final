import { Injectable } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { TableService } from '@TableServices';
@Injectable({
  providedIn: 'root',
})
export class DragDropService {
  isDragging: boolean = false;
  targetIndex: number | null = null;
  constructor(private tableService: TableService) {}

  onColumnEnter(index: number) {
    this.targetIndex = index;
  }
  draggingIndex: number | null = null;
  ondragColumn(index: any) {
    this.draggingIndex = index;
  }

  onColumnDrop(event: CdkDragDrop<string[]>) {
    let targetIndex =
      this.targetIndex !== null ? this.targetIndex : event.currentIndex;
    this.targetIndex = null;
    [
      this.tableService.mainDataControle[event.previousIndex],
      this.tableService.mainDataControle[targetIndex],
    ] = [
      this.tableService.mainDataControle[targetIndex],
      this.tableService.mainDataControle[event.previousIndex],
    ];
  }
}
