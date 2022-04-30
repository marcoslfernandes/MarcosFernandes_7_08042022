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
    imageUrl: new FormControl()
  })

  comment=new FormGroup({
    texte: new FormControl()
  })




  userData: any;

  post: any;
  
  commentData: any;

  loading: boolean = false; // Flag variable
  file: File = null as any; // Variable to store file


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
      console.log("teste")
      this.onUpload();
      this.timelineService.createNewPost(this.register.value).subscribe((result)=>{
        console.warn("Nouveau post créé", result)
      })
    }


    onChange(event: any) {
      this.file = event.target.files[0];
      const value = event.target.value;

  // this will return C:\fakepath\somefile.ext
  console.log(value);

  const files = event.target.files;

  //this will return an ARRAY of File object
  console.log(files);

return 
 `<input type="file" formControlName="imageUrl" class="form-group" name="imageUrl" (change)="onChange($event)">`
  }
  
    // OnClick of button Upload
    onUpload() {
      this.loading = !this.loading;
      console.log(this.file);
      this.timelineService.upload(this.file).subscribe(
        (event: any) => {
          if (typeof (event) === 'object') {
            this.loading = false; // Flag variable
          }
        }
      );

    this.timelineService.deletePost().subscribe((result)=>{
          console.warn("result", result)
      })

    }
  
    
  faTools = faTools;

}
