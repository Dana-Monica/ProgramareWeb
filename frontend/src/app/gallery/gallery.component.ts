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
    console.log(product_name);
    let index = -1 ;
    for ( var i = 0 ; i < SharedInfoComponent.items.length ; ++i )
      {
        console.log( SharedInfoComponent.items[i]['name']);
        if( SharedInfoComponent.items[i]['name'] == product_name)
            index = i;
      }
    console.log(index);
    SharedInfoComponent.index = index;
  }

  AddToBasket(){
    localStorage.setItem("product",this.product_name)
    console.log("add product to basket!");
  }

}
