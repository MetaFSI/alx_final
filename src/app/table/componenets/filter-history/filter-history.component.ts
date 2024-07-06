import { Component, OnInit } from '@angular/core';
import { FilterHistoryService, FilterService } from '@TableServices';

@Component({
  selector: 'app-filter-history',
  templateUrl: './filter-history.component.html',
  styleUrls: ['./filter-history.component.scss']
})
export class FilterHistoryComponent implements OnInit{
filter!:FilterService;
filterHistory!:FilterHistoryService
index:number=0;
iconSwitch:boolean=false;


  constructor(private filterService:FilterService,private filterHistoryService:FilterHistoryService){}

  ngOnInit(): void {
      this.filter=this.filterService
      this.filterHistory=this.filterHistoryService
  }
 filterArray(array:any) {
    return array.filter((obj:any)=> obj.content !== '');
  }

}
