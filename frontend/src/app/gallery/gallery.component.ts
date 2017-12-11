import { Component, OnInit ,Input } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';

import { SharedInfoComponent } from '../shared-info/shared-info.component';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  @Input() product_name :string;
  @Input() index : number;
  @Input() image_location : string;
  constructor(public router: Router,public http: Http) { }

  ngOnInit() {
    
  }

  Rate(){
    console.log("rate product!");
  }

  SelectProduct(product_name){
    localStorage.setItem("SelectedProduct",product_name)
    console.log(this.index);
    SharedInfoComponent.index = this.index;
  }

  AddToBasket(){
    localStorage.setItem("product",this.product_name)
    console.log("add product to basket!");
  }

}
