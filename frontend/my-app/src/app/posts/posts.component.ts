import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from './posts.service';
import { FormGroup, FormControl } from '@angular/forms';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private postsService: PostsService) { }

  post: any;
  titre: any;
  texte: any;
  post_id: any;
  postId: any;
  texte_comment: any;
  commentaire: any;
  user: any;
  id: any;
  prenom: any;
  nom: any;
  

  comment = new FormGroup({
    texte: new FormControl(),
    post_id: new FormControl()
  })

  ngOnInit(): void {


   
    this.getPosts();

    // this.getComment();

    this.getAllComments();

  //  this.getUser();
  
   


  }

 

  postComment() {
    window.location.reload();
    this.id = JSON.parse(localStorage.getItem('id') || '{}')
    console.warn(this.comment.value)
    
  
    this.post_id = this.route.snapshot.params['id']
  
    this.postsService.createNewComment(this.comment.value, this.id).subscribe((result) => {
      console.warn("Nouveau commentaire créé", result)
    })
  };


  // getUser(){
  //   this.id = this.route.snapshot.params['user_id']

  //   this.postsService.getUserById(this.id).subscribe((user) => 
  //     {


  //       console.log(user)

  //       this.user = user.prenom;
  

  //     })
  // }

 

  getPosts() {

    this.route.paramMap
      .subscribe(params => {
        const id = params.get('id')
        this.postsService.getPostById(id).subscribe((posts) => {

          console.log(posts);


          this.titre = posts.titre
          this.texte = posts.texte
        


        })

      });





  }

  // getComment(){

  //   let id_c=this.route.snapshot.params['id']
  //     this.postsService.getCommentById(id_c).subscribe((commentaire) => {

  //       console.warn(commentaire);
       
  //       this.commentaire = commentaire;

  // })}

  getAllComments() {
    let id_c=this.route.snapshot.params['id']
    this.postsService.getAllComments(id_c).subscribe((commentaire) => {
      console.log(commentaire);
    


      this.commentaire = commentaire;
    });
  }

 
  deleteP(){
    
    this.id=this.route.snapshot.params['id']
    this.postsService.deletePost(this.id).subscribe((result) => {
      
      console.warn(result);

      this.router.navigate(['/timeline'])

    });

   


  }

 deleteC(){
   console.log("teste")
   window.location.reload();
   this.id = JSON.parse(localStorage.getItem('id') || '{}')
   this.postsService.deleteComment(this.id).subscribe((result) => {
      
    console.warn(result);

   

  });
   
 }


  // postComment(){
  //   window.location.reload();
  //   console.warn(this.comment.value)
  //   this.timelineService.createNewComment(this.comment.value).subscribe((result)=>{
  //     console.warn("Nouveau commentaire créé", result)

  //   })

  // }
  faTrash = faTrash;
  faHome = faHome;

}
