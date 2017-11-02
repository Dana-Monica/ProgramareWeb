import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model : any = {};
  loading = false;
  
  constructor(public router: Router, public http: Http) {  }

  ngOnInit() {
  }

  login(username, password) {
    
    let body = JSON.stringify({ username, password });
    let headers = new Headers();
    headers.append('Content-Type','application/json');

    console.log(body);
    this.http.post('http://localhost:8079/login', body, { headers: headers })
      .subscribe(
        response => {
          console.log("HELLO!");
          localStorage.setItem('user', username);
          localStorage.setItem('password', password);
          this.router.navigate(['asdasd']);
        },
        error => {
          alert(error.text());
          console.log(error.text());
        }
      );

  }
  
}
