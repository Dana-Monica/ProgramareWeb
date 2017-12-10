import { Component, OnInit , DoCheck } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';



@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit , DoCheck {

  new_mail = ""
  password = ""
  pr_cost = ""
  pr_name = ""
  pr_description = ""
  
  isAdmin : boolean
  orders : any
  users : any
  constructor(  public http: Http) { }

  getUsers(){
    this.http.get('http://localhost:8084/users')
      .subscribe(
        response => {
          this.users = response.json();
        },
        error => {
          alert(error.text());
          console.log(error.text());
        }
      )
  }

  MakeAdmin(user) {
    let body = JSON.stringify({user : user });
    let headers = new Headers();
    headers.append('Content-Type','application/json');

    this.http.post('http://localhost:8084/users/update', body , {headers:headers})
      .subscribe(
        response => {
            console.log("User Updated!");
            this.getUsers();
        },
        error => {
          alert(error.text());
          console.log(error.text());
        }
      )
  }

  InsertProduct(){
    let body = JSON.stringify({cost : this.pr_cost , name : this.pr_name , description : this.pr_description });
    let headers = new Headers();
    this.pr_cost = ""
    this.pr_name = ""
    this.pr_description = "" 
    console.log("Insert!");
    headers.append('Content-Type','application/json');

    this.http.post('http://localhost:8084/product/add', body , {headers:headers})
      .subscribe(
        response => {
            console.log("Product added!");
        },
        error => {
          alert(error.text());
          console.log(error.text());
        }
      )
  }

  ngOnInit() {
    this.getUsers();

    let body = JSON.stringify({user : localStorage.getItem("user")});
    console.log(body);
    
    let headers = new Headers();
    headers.append('Content-Type','application/json');

    this.http.post('http://localhost:8084/order', body, { headers: headers })
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

  ngDoCheck() {
    if( localStorage.getItem("admin") == "true")
      this.isAdmin = true
    else
      this.isAdmin = false
  }

}
