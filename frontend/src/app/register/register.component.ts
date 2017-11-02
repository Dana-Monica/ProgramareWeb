import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model : any = {};
  loading = false;

  constructor(public router: Router, public http: Http) { }

  ngOnInit() {
  }

  register(nume, mail, usernam, passwor) {

    let body = JSON.stringify({usernam, passwor, mail,nume});
    let headers = new Headers();
    headers.append('Content-Type','application/json');

    console.log(body);
    this.http.post('http://localhost:8079/register', body, { headers: headers})
      .subscribe(
        response => {
          console.log("Hello from register!");
          localStorage.setItem('user',usernam);
          localStorage.setItem('password',passwor);
          localStorage.setItem('nume',nume);
          localStorage.setItem('email',mail);
          this.router.navigate(['home']);
        },
        error => {
          alert(error.text());
          console.log(error.text());
        }
      );
  }

}
