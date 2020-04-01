import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css']
})
export class PagenotfoundComponent implements OnInit {
  private currentPath: string;

  constructor( private router:  Router) {
    //to get the current path
    this.currentPath= this.router.url;
    console.log(this.currentPath);
   }

  ngOnInit() {
  }

}
