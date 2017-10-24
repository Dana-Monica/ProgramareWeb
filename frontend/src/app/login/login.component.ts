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
  
  constructor(public router: Router, public http: Http) { }

  ngOnInit() {
  }

  login(username, password) {
    let body = JSON.stringify({ username, password });
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    this.http.post('http://localhost:8080/login', body, { headers: headers })
      .subscribe(
        response => {
         // localStorage.setItem('id_token', response.json().id_token);
          this.router.navigate(['']);
        },
        error => {
          alert(error.text());
          console.log(error.text());
        }
      );
  }
  
}
