import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  items : any  = {}

  constructor(public router: Router, public http: Http) {
    
   }

  ngOnInit() {
    //TODO get list of items from DB
    // this.http.get('http://localhost:8079/products')
    // .subscribe(
    //   response => {
    //     console.log("HELLO!");
    //     this.items = response;
    //   },
    //   error => {
    //     alert(error.text());
    //     console.log(error.text());
    //   }
    // );
    this.items = ["First","Second","Third"]
  }

}
