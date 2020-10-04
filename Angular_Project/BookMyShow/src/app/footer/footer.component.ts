import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  langMovies = [
    { "key": "Hindi Movies", "value": "/movies/hindi-movies" },
    { "key": "English Movies", "value": "/movies/hindi-movies" },
    { "key": "Telgu Movies", "value": "/movies/hindi-movies" },
    { "key": "Bengali Movies", "value": "/movies/hindi-movies" },
    { "key": "Tamil Movies", "value": "/movies/hindi-movies" },
    { "key": "Malyali Movies", "value": "/movies/hindi-movies" },
    { "key": "Kanaad Movies", "value": "/movies/hindi-movies" }
  ];
}
