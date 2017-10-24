import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model : any = {};
  loading = false;

  constructor() { }

  ngOnInit() {
  }

  register() {
    console.log(this.model.fullName + this.model.email + this.model.username + this.model.password);
  }

}
