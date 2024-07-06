import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jlet',
  templateUrl: './jlet.component.html',
  styleUrls: ['./jlet.component.scss']
})
export class JletComponent implements OnInit{
img='../../assets/img1.jpeg'
images=['../../assets/img1.jpeg','../../assets/img2.jpeg','../../assets/img.jpeg']
ngOnInit(): void {
  
}


clickI(number:string){
this.img=number

}
}
