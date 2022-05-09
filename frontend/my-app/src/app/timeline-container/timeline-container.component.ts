import { Component, OnInit  } from '@angular/core';
import { faTools } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { TimelineService } from './timeline.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-timeline-container',
  templateUrl: './timeline-container.component.html',
  styleUrls: ['./timeline-container.component.css']
})

export class TimelineContainerComponent implements OnInit {


 

 



  userData: any;
  
  userAuteur: any;

  post: any;
  
  commentaire: any;

  id: any;

  token: any;

  register:any;

  formData: any;

  loading: boolean = false; // Flag variable
  file: File = null as any; // Variable to store file
  


  constructor(private route: ActivatedRoute, private timelineService: TimelineService, private router: Router, public fb: FormBuilder,
    private http: HttpClient) { }

 
    API: string = "http://localhost:3000/";

  ngOnInit(): void {

    this.register=new FormGroup({
      titre: new FormControl(),
      texte: new FormControl(),

      
    })

 

  


    // this.activatedRoute.paramMap.subscribe(params => {
    //   let id = params.get('id')
    //   console.log(id)
      
    // })

    // console.log(JSON.parse(localStorage.getItem('id') || '{}'))

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
   
    getID(){
    
      this.route.paramMap
      .subscribe(params => {
        console.log(params)
      })

    }


    submit(){
  
     
     
      this.id = JSON.parse(localStorage.getItem('id') || '{}');
      this.token = JSON.parse(localStorage.getItem('token') || '{}');
      // window.location.reload();
      console.warn(this.register.value)

      
      const formData = new FormData();

      this.register.get('titre').setValue('titre');
      this.register.get('texte').setValue('texte');
      
     formData.append('titre', this.register.get('titre').value);
      formData.append('texte', this.register.get('texte').value);
      formData.append('imageUrl', this.file);

    
    
      this.timelineService.createNewPost(this.formData, this.id, this.token).subscribe((result)=>{
        console.warn("Nouveau post créé", result)
      })

      

    };

  

    logout(){
     
      // localStorage.removeItem('isUserLoggedIn')
      // localStorage.removeItem('user')
      localStorage.clear()
      this.router.navigate(['/'])

    }

   
  
   


    onChange(event: any) {
      const file = event.target.files[0]
  //     // const value = event.target.value;

  // // this will return C:\fakepath\somefile.ext
  // // console.log(value);

  // //this will return an ARRAY of File object
  console.log(file);
   


  }
  
  
    // onUpload(event: any) {
    //   // this.loading = !this.loading;
    //   // console.log(this.file);
    //   // this.timelineService.upload(this.file).subscribe(
    //   //   (event: any) => {
    //   //     if (typeof (event) === 'object') {
    //   //       this.loading = false; // Flag variable
    //   //     }
    //   //   }
    //   // );

  

    // }

    
  
    
  faTools = faTools;
  faTrash = faTrash;
  faKey = faKey;

}
