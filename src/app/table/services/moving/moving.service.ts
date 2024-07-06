import { Injectable ,ElementRef} from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class MovingService {

  constructor(private elementRef: ElementRef) { }
  isDragging = false;
  position!: string;
  onMouseDown(event: MouseEvent): void {
    this.isDragging = true;
  }
  
  onMouseUp(): void {
    this.isDragging = false;
  }
  
  onMouseMove(event: MouseEvent): void {
    if (this.isDragging) {
      const element = this.elementRef.nativeElement;
      element.style.left = event.clientX + 'px';
      element.style.top = event.clientY + 'px';
      // Update the position
      this.updatePosition();
    }
  }
  
  updatePosition(): void {
    const element = this.elementRef.nativeElement;
    const x = element.offsetLeft;
    const y = element.offsetTop;
    this.position = `(${x}, ${y})`;
  }
}
