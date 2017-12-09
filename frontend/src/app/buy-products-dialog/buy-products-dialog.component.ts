import { Component, OnInit , DoCheck } from '@angular/core';

@Component({
  selector: 'app-buy-products-dialog',
  templateUrl: './buy-products-dialog.component.html',
  styleUrls: ['./buy-products-dialog.component.css']
})
export class BuyProductsDialogComponent implements OnInit, DoCheck{
  cart = new Set();
  shopping_list = []
  
  constructor() { }

  ngOnInit() {
  }
  ngDoCheck(){

    if ( localStorage.getItem("product") !== null){
      if( localStorage.getItem("product") != "-1"){
        this.cart.add(localStorage.getItem("product"))
        this.cart.forEach( v => {
          if( this.shopping_list.indexOf(v) < 1)
              this.shopping_list.push(v)
        })
      }
    }


    
  }

}
