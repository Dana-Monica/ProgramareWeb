import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prod',
  templateUrl: './prod.component.html',
  styleUrls: ['./prod.component.css']
})
export class ProdComponent implements OnInit {
  new_comment : string
  comments : any 
  
  constructor() { }

  ngOnInit() {
  }

  AddComment( ){
    alert(this.new_comment);
    this.new_comment = ""
  }

}
