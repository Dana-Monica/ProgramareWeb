import { Component ,  DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  title = 'iShop';
  name = 'Not logged in';
  logged = false;
  constructor(public router: Router){
    
  }
  
  ngDoCheck(){
      if ( localStorage.getItem("user") !== null){
          this.name=localStorage.getItem("user")
          this.logged = true;
      }
  }

  LogOut(){
    this.logged = false;
    console.log("removing items from local Storage");
    localStorage.removeItem("user");
    localStorage.removeItem("password");
  }

}
