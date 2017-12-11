import { Component ,  DoCheck } from '@angular/core';
import {MatDialog , MatSnackBar} from '@angular/material';
import {BuyProductsDialogComponent} from './buy-products-dialog/buy-products-dialog.component'
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';


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
  my_products_array = []
  constructor(public router: Router , public dialog: MatDialog  ,  public http: Http , public snackBar: MatSnackBar){
    
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

  UpdateProduct(prod_name){
    let body = JSON.stringify({product : prod_name});
    console.log(body);
    
    let headers = new Headers();
    headers.append('Content-Type','application/json');

    this.http.post('http://localhost:8079/updateproduct', body, { headers: headers })
    .subscribe(
      response => {
          console.log("updated quantity of product!");            
      },
      error => {
        alert(error.text());
        console.log(error.text());
      }
    );
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
        if( this.cart.size != 0 && result == true ){
          
          console.log("Create order!");
          let my_id : string
          this.my_products_array = []
          this.cart.forEach( v => {
            this.my_products_array.push(v)
            this.UpdateProduct(v)
            my_id += v
          })
          
          let body = JSON.stringify({user:localStorage.getItem("user"),products : this.my_products_array , order_id : my_id});
          console.log(body);
          
          let headers = new Headers();
          headers.append('Content-Type','application/json');
      
          if( result == true ){
            this.http.post('http://localhost:8079/putorder', body, { headers: headers })
            .subscribe(
              response => {
                  console.log("order added!");
                  alert("Order was added!");
                  this.cart = new Set();                
              },
              error => {
                alert(error.text());
                console.log(error.text());
              }
            );
          }
        }
        
    });
    console.log("Buying these products...");
    console.log(this.cart);
  }

}
