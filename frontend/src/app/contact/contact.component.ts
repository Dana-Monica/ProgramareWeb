import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  model : any = {};
  loading = false;

  constructor(public router: Router, public http: Http) { }

  ngOnInit() {
  }

  contact(name, mail, phone, message) {

    let body = JSON.stringify({name, mail, phone, message});
    let headers = new Headers();
    headers.append('Content-Type','application/json');

    console.log(body);
    this.http.post('http://localhost:8079/send/mail', body, { headers: headers})
      .subscribe(
        response => {
          console.log("Hello from Contact!");

          this.router.navigate(['contact']);
        },
        error => {
          alert(error.text());
          console.log(error.text());
        }
      );
  }

}