import { AfterViewInit, Component, Input, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { faTools } from '@fortawesome/free-solid-svg-icons';
import { AppService } from '../app.service';
import { PostService } from '../post.service';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common';



@Component({
  selector: 'app-timeline-container',
  templateUrl: './timeline-container.component.html',
  styleUrls: ['./timeline-container.component.css']
})
export class TimelineContainerComponent implements OnInit {

  userData: any;

  postData: any;

  constructor(private appService: AppService, private postService: PostService) { }

  
  ngOnInit(): void {
    this.appService.getAllUsers().subscribe((users) => 
      {
        console.log(users);
        this.userData = users;
      });

      this.postService.getAllPosts().subscribe((posts) => 
      {
        console.log(posts);
        this.postData = posts;
      });
    }


  faTools = faTools;

}
