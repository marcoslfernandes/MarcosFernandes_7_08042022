import { Component, OnInit } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-parametres-container',
  templateUrl: './parametres-container.component.html',
  styleUrls: ['./parametres-container.component.css']
})
export class ParametresContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  faHome = faHome;

}
