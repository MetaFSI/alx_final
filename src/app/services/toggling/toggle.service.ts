import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToggleService {
toggle:boolean=false;
dropMenu:boolean=false;
colPoints:boolean=false;
filterModel:boolean=false;
index!:number;
  constructor() { }

  setToggle(){
    this.toggle=!this.toggle
  }
  setDropMenu(){
    this.dropMenu=!this.dropMenu
  }
  setColPoints(){
    this.colPoints=!this.colPoints
  }
  setFilterModal(index:number,status:string){
    if(status==='show'){
      this.filterModel=true
    }else{
      this.filterModel=false
    }
 
    this.index=index
    console.log(index,this.index)
  }
}
