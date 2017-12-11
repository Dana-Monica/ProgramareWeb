import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shared-info',
  templateUrl: './shared-info.component.html',
  styleUrls: ['./shared-info.component.css']
})
export class SharedInfoComponent implements OnInit {

  static items : any
  static index 

  constructor() { }

  ngOnInit() {
  }

}
