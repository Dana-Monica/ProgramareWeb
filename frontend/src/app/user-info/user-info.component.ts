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

  name=""
  
  isAdmin : boolean
  orders : any
  users : any
  constructor(  public http: Http) {
    this.name=localStorage.getItem("user");
  }

  getUsers(){
    this.http.get('http://localhost:8079/users')
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

    this.http.post('http://localhost:8079/users/update', body , {headers:headers})
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

  MakeRetur(id){
    let body = JSON.stringify({ user : localStorage.getItem('user') , order_id : id  });
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    
    console.log("Befor : " + body);
    
    this.http.post('http://localhost:8079/retur', body , {headers:headers})
      .subscribe(
        response => {
            console.log("Products Returned!");
            this.getOrders();
        },
        error => {
          alert(error.text());
          console.log(error.text());
        }
      )
  }

  UpdateAccount(){
    let body : any
    if( this.new_mail != "" && this.password != "")
        body = JSON.stringify({ user :localStorage.getItem("user") ,mail : this.new_mail,password : this.password});
    else if ( this.new_mail != "" )
        body = JSON.stringify({user :localStorage.getItem("user") , mail : this.new_mail , password :localStorage.getItem("pass") })
    else body = JSON.stringify({ user :localStorage.getItem("user") , password : this.password , mail : localStorage.getItem("mail") })
    let headers = new Headers();
  
    this.new_mail = ""
    this.password = ""
    console.log("Insert!");
    headers.append('Content-Type','application/json');

    this.http.post('http://localhost:8079/users/credentials', body , {headers:headers})
      .subscribe(
        response => {
            console.log(response.json());
            console.log("User updated!");
        },
        error => {
          alert(error.text());
          console.log(error.text());
        }
      )
  }

  DeleteUser(user){
    let body = JSON.stringify({user : user });
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    console.log(body);
    this.http.post('http://localhost:8079/users/delete', body , {headers:headers})
      .subscribe(
        response => {
            console.log("User Deleted!");
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

    this.http.post('http://localhost:8079/product/add', body , {headers:headers})
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
    this.getOrders();
  }

  getOrders(){
    let body = JSON.stringify({user : localStorage.getItem("user")});
    console.log(body);
    
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    console.log(body);
    this.http.post('http://localhost:8079/order', body, { headers: headers })
    .subscribe(
      response => {
          this.orders = response.json()    
          console.log(this.orders);
      },
      error => {
        alert(error.text());
        console.log(error.text());
      }
    );
  }

  ngDoCheck() {
    console.log(localStorage.getItem("admin") );
    if( localStorage.getItem("admin") == "true")
      this.isAdmin = true
    else
      this.isAdmin = false
    //this.getOrders();
  }

}
