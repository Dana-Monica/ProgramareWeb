import { Component ,  DoCheck } from '@angular/core';
import {MatDialog} from '@angular/material';
import {BuyProductsDialogComponent} from './buy-products-dialog/buy-products-dialog.component'
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
  cart = new Set();
  constructor(public router: Router , public dialog: MatDialog ){
    
  }
  
  ngDoCheck(){
      if ( localStorage.getItem("user") !== null){
          this.name=localStorage.getItem("user")
          this.logged = true;
      }
      if ( localStorage.getItem("product") !== null){
        this.cart.add(localStorage.getItem("product"))
    }
  }

  LogOut(){
    this.logged = false;
    console.log("removing items from local Storage");
    localStorage.removeItem("user");
    this.cart = new Set();
    console.log(this.cart);
    localStorage.removeItem("password");
  }

  BuyProducts(){
    const dialogRef = this.dialog.open(BuyProductsDialogComponent, {
      height: '20%',
      width:'40%',
      position:{
        left:'30%'
      }
    });

    dialogRef.afterClosed().subscribe(
      result => {
        console.log(`Dialog result: ${result}`);
    });
    console.log("Buying these products...");
    console.log(this.cart);
  }

}
