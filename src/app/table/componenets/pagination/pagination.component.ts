import { Component,OnInit } from '@angular/core';
import { PaginationService,FilterService } from '@TableServices';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  paginationService:any;
  filterService: any;
  constructor( private paginationService_: PaginationService,  private filterservice_: FilterService){}

  ngOnInit(): void {
    this.paginationService=this.paginationService_
    this.filterService=this.filterservice_
    this.paginationService_.pagesSwitch()
  }
}

