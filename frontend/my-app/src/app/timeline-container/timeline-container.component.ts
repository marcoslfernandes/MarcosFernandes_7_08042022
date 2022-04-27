import { Component, OnInit } from '@angular/core';
import { faTools } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-timeline-container',
  templateUrl: './timeline-container.component.html',
  styleUrls: ['./timeline-container.component.css']
})
export class TimelineContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  faTools = faTools;

}
