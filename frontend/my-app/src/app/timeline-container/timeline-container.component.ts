import { Component, OnInit  } from '@angular/core';
import { faTools } from '@fortawesome/free-solid-svg-icons';
import { TimelineService } from './timeline.service';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-timeline-container',
  templateUrl: './timeline-container.component.html',
  styleUrls: ['./timeline-container.component.css']
})

export class TimelineContainerComponent implements OnInit {


  register=new FormGroup({
    titre: new FormControl(),
    texte: new FormControl(),
  })

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
   
    getPost(){
      window.location.reload();
      console.warn(this.register.value)
      this.timelineService.createNewPost(this.register.value).subscribe((result)=>{
        console.warn("Nouveeau post créé", result)
      })
    }

    
  faTools = faTools;

}
