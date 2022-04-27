import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {

  readonly ROOT_URL = 'http://localhost:3000/api/auth/signup'

  constructor(private http: HttpClient){}

  ngOnInit(): void {
  }

}
