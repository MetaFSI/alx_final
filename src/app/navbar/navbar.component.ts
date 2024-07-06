import { Component ,OnInit} from '@angular/core';
import { ToggleService } from '../services/toggling/toggle.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
toggling!:any;
constructor(private toggleservice:ToggleService){}

  ngOnInit() {  
   this.toggling=this.toggleservice
  }
}
