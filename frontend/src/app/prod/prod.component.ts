import { Component, OnInit , DoCheck } from '@angular/core';
import { SharedInfoComponent } from '../shared-info/shared-info.component';
import { Http, Headers, RequestOptions } from '@angular/http';


@Component({
  selector: 'app-prod',
  templateUrl: './prod.component.html',
  styleUrls: ['./prod.component.css']
})
export class ProdComponent implements OnInit , DoCheck {
  new_comment : string
  
  items : any
  isAdmin 

  name = ""
  price 
  description = ""
  comments = [] 
  index 
  rate
  nr_rates 
  my_rate 
  wanna_rate : false


  constructor(public http : Http) {
     this.items = SharedInfoComponent.items;
     this.index = SharedInfoComponent.index;
     this.name = this.items[this.index].name
     this.price = this.items[this.index].cost
     this.description = this.items[this.index].description
     this.comments = this.items[this.index].comments
     this.rate = this.items[this.index].rate
     this.nr_rates = this.items[this.index].nr_rates
  }

  DoRate(rate){
    this.rate = ( this.rate + this.my_rate ) / (this.nr_rates + 1)

    let body = JSON.stringify({rate : this.rate , nr_rate : this.nr_rates+1 , name : this.name});
    console.log(body);

    this.new_comment = ""
    
    let headers = new Headers();
    headers.append('Content-Type','application/json');

    this.http.post('http://localhost:8079/rate/update', body, { headers: headers })
    .subscribe(
      response => {
          console.log("rate was updated!");            
      },
      error => {
        alert(error.text());
        console.log(error.text());
      }
    );
  }

  ngDoCheck(){
    if( localStorage.getItem("admin") == "true")
        this.isAdmin = true
    else
        this.isAdmin = false
  }

  DeleteComment(index , comment){
  
    this.comments.splice(index,0,comment);
    let body = JSON.stringify({comment : comment , name : this.name});
    console.log(body);

    this.new_comment = ""
    
    let headers = new Headers();
    headers.append('Content-Type','application/json');

    this.http.post('http://localhost:8079/comment/delete', body, { headers: headers })
    .subscribe(
      response => {
          console.log("comment was added!");            
      },
      error => {
        alert(error.text());
        console.log(error.text());
      }
    );
  }

  BuyProduct(){
    localStorage.setItem("product",this.name)
    console.log("add product to basket!");
  }

  ngOnInit() {
  }

  AddComment( ){

    
    this.comments.push(this.new_comment);

    let body = JSON.stringify({comment : this.new_comment , name : this.name});
    console.log(body);

    this.new_comment = ""
    
    let headers = new Headers();
    headers.append('Content-Type','application/json');

    this.http.post('http://localhost:8079/comment/add', body, { headers: headers })
    .subscribe(
      response => {
          console.log("comment was added!");            
      },
      error => {
        alert(error.text());
        console.log(error.text());
      }
    );
  }

}
