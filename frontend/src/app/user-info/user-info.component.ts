import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';



@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  new_mail = ""
  password = ""
  orders : any
  constructor(  public http: Http) { }

  ngOnInit() {
    let body = JSON.stringify({user : localStorage.getItem("user")});
    console.log(body);
    
    let headers = new Headers();
    headers.append('Content-Type','application/json');

    this.http.post('http://localhost:8079/order', body, { headers: headers })
    .subscribe(
      response => {
          console.log("order added!");
          this.orders = response.json()    
      },
      error => {
        alert(error.text());
        console.log(error.text());
      }
    );
  }

}
