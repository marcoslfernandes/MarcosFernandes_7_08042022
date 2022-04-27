import { AfterViewInit, Component, Input, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { faTools } from '@fortawesome/free-solid-svg-icons';
import { AppService } from '../app.service';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common';



@Component({
  selector: 'app-timeline-container',
  templateUrl: './timeline-container.component.html',
  styleUrls: ['./timeline-container.component.css']
})
export class TimelineContainerComponent implements OnInit {

  

  constructor(private appService: AppService) { }
 
  ngOnInit(): void {

   

    this.appService.getAllUsers().subscribe(users => 
      {

        for (let i = 0; i < users.length; i++) {
          console.log(users[i].prénom)
          // users.innerHTML += `
          //   <h3 class="productName">${data[i].prénom}</h3>
          //   `

        }});

  }

  

  faTools = faTools;

}
