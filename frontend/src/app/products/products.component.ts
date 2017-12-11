import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { SharedInfoComponent } from '../shared-info/shared-info.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  items : any 
  items_copy : any
  new_comment : string
  searched_item : string

  constructor(public router: Router, public http: Http) {
    
  }

  AddComment( ){
    alert(this.new_comment);
  }

  filterItem(value){
    console.log("Value is : " + value );
    console.log(this.items_copy);
    if(!value) this.items = this.items_copy;
    else{
       this.items = []
       this.items_copy.forEach(
           item => {
              if ( item.name.startsWith(value))
                this.items.push(item)
           }
      )
    }
  }

  ngOnInit() {
    console.log("Initialize products array!");
    this.http.get('http://localhost:8079/products')
    .subscribe(
      response => {
        let answear = response.json();
        SharedInfoComponent.items = answear;
        console.log(SharedInfoComponent.items);
        this.items = answear;        
        this.items_copy = this.items
      },
      error => {
        alert(error.text());
        console.log(error.text());
      }
    );
  }

}
