import { Component, OnInit ,Input } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  @Input() product_name :string;
  constructor(public router: Router,public http: Http) { }

  ngOnInit() {
    
  }

  Rate(){
    console.log("rate product!");
  }

  AddToBasket(){
    localStorage.setItem("product",this.product_name)
    console.log("add product to basket!");
  }

}
