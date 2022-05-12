import { Component, OnInit  } from '@angular/core';
import { faTools } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { TimelineService } from './timeline.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Publi } from './post.model';


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

  objet: any;

  register:any;

  formData: any;

  admin: any;

  loading: boolean = false; // Flag variable
  
  file: File = null as any; // Variable to store file
  


  
  constructor(private route: ActivatedRoute, private timelineService: TimelineService, private router: Router, public fb: FormBuilder,
    private http: HttpClient) { 
    }

 
    API: string = "http://localhost:3000/";

  ngOnInit(): void {

    // this.register=new FormGroup ({
    //   titre: new FormControl(),
    //   texte: new FormControl(),
    // })


    this.register=this.fb.group({
      titre: [''],
      texte: [''],
      imageUrl: [null]
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

    

    visibility(){

      this.admin = JSON.parse(localStorage.getItem('admin') || '{}');
  
      if (this.admin == 1) {
        
        return false
        
      } else{
        return true
      }
    }

    visibilityModerator(){
      this.admin = JSON.parse(localStorage.getItem('admin') || '{}');
  
      if (this.admin == 0) {
        
        return false
        
      } else{
        return true
      }
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

    onChange(event: Event) {

      const file = (event.target as HTMLInputElement).files![0];
      console.log(file);
      this.register.patchValue({
        imageUrl: file,
      });
      this.register.get('imageUrl').updateValueAndValidity();
      // this.register.get('imageUrl');

  //     const file = event.target.files[0]
  

  }

    submit(){
  
      // this.objet = {}
     
      this.id = JSON.parse(localStorage.getItem('id') || '{}');
      this.token = JSON.parse(localStorage.getItem('token') || '{}');
      // window.location.reload();
      // console.warn(this.register.get('titre').value)
      // console.warn(this.register.get('texte').value)
      
      // this.objet.titre = this.register.get('titre').value
      // this.objet.texte = this.register.get('texte').value
      
      // const formData = new FormData();
      
      // // formData.append('titre', this.objet);


      // formData.append('titre', this.register.get('titre').value);
      // formData.append('texte', this.register.get('texte').value);


      // formData.append('', JSON.stringify(this.objet));
      // formData.append('imageUrl', this.file);

      // console.warn(JSON.stringify(this.objet))


      //


      // let formData: any = new FormData();
    // formData.append('titre', this.form.get('titre'));
    // formData.append('texte', this.form.get('texte'));
    // formData.append('imageUrl', this.form.get('imageUrl'));

    // console.warn(formData);
  
      let post: Publi = ({titre: this.register.get('titre').value, texte: this.register.get('texte').value})
    
      this.timelineService.createNewPost(post, this.id, this.token, this.register.get('imageUrl').value).subscribe((result)=>{
        console.warn("Nouveau post créé", result)
      })

      

    };

  

    logout(){
     
      // localStorage.removeItem('isUserLoggedIn')
      // localStorage.removeItem('user')
      localStorage.clear()
      this.router.navigate(['/'])

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
