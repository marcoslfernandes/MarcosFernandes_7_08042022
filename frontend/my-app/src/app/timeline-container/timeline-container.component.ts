import { Component, OnInit  } from '@angular/core';
import { faTools } from '@fortawesome/free-solid-svg-icons';
import { TimelineService } from './timeline.service';


@Component({
  selector: 'app-timeline-container',
  templateUrl: './timeline-container.component.html',
  styleUrls: ['./timeline-container.component.css']
})

export class TimelineContainerComponent implements OnInit {

  userData: any;

  post: any;
  
  commentData: any;


  constructor(private timelineService: TimelineService) { }

  
  ngOnInit(): void {

    this.refreshPosts();

    this.timelineService.getAllUsers().subscribe((users) => 
      {
        console.log(users);
        this.userData = users;
      });

      this.timelineService.getAllPosts().subscribe((posts) => 
      {
        console.log(posts);
        this.post = posts;
      });

      this.timelineService.getAllComments().subscribe((comments) => 
      {
        console.log(comments);
        // this.commentData = comments;
      });


    }


    refreshPosts() {
      this.timelineService.getAllPosts().subscribe((posts) => 
      {
        console.log(posts);
        this.post = posts;
      });     
   
    }
   
    addPost() {
      this.timelineService.addPost(this.post)
        .subscribe(publi => {
          console.log(publi)
          this.refreshPosts();
        })      
    }

    
  faTools = faTools;

}
