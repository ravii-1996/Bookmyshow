import { ICities } from '../interface/ICities';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LookupService } from '../lookup.service';
import { Router } from "@angular/router";

@Component({
  selector: 'navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {
  private errormsg: string;
  private selected: string = "Delhi";
  constructor(private lookupService: LookupService, private router: Router) { }
  private cities = [];

  routeWithCityName(cityName) {
    //use behaviour subject to pass the city name
    this.lookupService.passCityNameToComponent(cityName.city);
    this.router.navigate(['/', cityName.city]);
  }
  ngOnInit() {
    //api to get the cities.. it can be also be put in an array...
    this.lookupService.getCities().subscribe(data => this.cities = data, error => this.errormsg = error);
  }


}
