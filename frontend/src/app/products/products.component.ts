import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  items : any 
  new_comment : string

  constructor(public router: Router, public http: Http) {
    
  }

  AddComment( ){
    alert(this.new_comment);
  }


  ngOnInit() {
    console.log("Initialize products array!");
    this.http.get('http://localhost:8070/products')
    .subscribe(
      response => {
        let answear = response.json();
        this.items = answear;        
      },
      error => {
        alert(error.text());
        console.log(error.text());
      }
    );
  }

}
