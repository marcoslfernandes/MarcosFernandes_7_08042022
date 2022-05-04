import { Component, OnInit  } from '@angular/core';
import { faTools } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { TimelineService } from './timeline.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


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
  
  commentaire: any;

  loading: boolean = false; // Flag variable
  file: File = null as any; // Variable to store file


  constructor(private activatedRoute: ActivatedRoute, private timelineService: TimelineService, private router: Router) { }

 
  

  ngOnInit(): void {

    // this.activatedRoute.paramMap.subscribe(params => {
    //   let id = params.get('id')
    //   console.log(id)
      
    // })

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

      this.timelineService.getAllComments().subscribe((commentaires) => 
      {
        console.log(commentaires);
        this.commentaire = commentaires;
      });

    

    }

    local(){
     let user = localStorage.getItem('user')
  
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
      this.onUpload();
      this.timelineService.createNewPost(this.register.value).subscribe((result)=>{
        console.warn("Nouveau post créé", result)
      })
    };

    postComment(){
      window.location.reload();
      console.warn(this.comment.value)
      this.timelineService.createNewComment(this.comment.value).subscribe((result)=>{
        console.warn("Nouveau commentaire créé", result)
      })

    }

    toggleAskTask(){
      console.log("toggle");
      localStorage.removeItem('isUserLoggedIn')
      localStorage.removeItem('user')
      // localStorage.clear()
      this.router.navigate(['/'])

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
      // console.log(this.file);
      this.timelineService.upload(this.file).subscribe(
        (event: any) => {
          if (typeof (event) === 'object') {
            this.loading = false; // Flag variable
          }
        }
      );

    // this.timelineService.deletePost().subscribe((result)=>{
    //       console.warn("result", result)
    //   })

  

    }

    
  
    
  faTools = faTools;
  faTrash = faTrash;
  faKey = faKey;

}
