import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from './posts.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private postsService: PostsService) { }

  post: any;
  titre: any;
  texte: any;
  post_id: any;
  texte_comment: any;
  commentaire: any;
  

  comment = new FormGroup({
    texte: new FormControl(),
    post_id: new FormControl
  })

  ngOnInit(): void {

   

 this.getPosts();

  // this.getComment();

  this.getAllComments();
   



  }

 


  postComment() {
    window.location.reload();
    console.warn(this.comment.value)
    this.postsService.createNewComment(this.comment.value).subscribe((result) => {
      // console.warn("Nouveau commentaire créé", result)
    })
  };

  getPosts(){

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

  //   // this.route.paramMap
  //   // .subscribe(comment => {
  //   //   let id_c = params.get('id')
  //   let id_c="66"
  //     this.postsService.getCommentById(id_c).subscribe((comments) => {
       
  //       console.warn(comments);
  //       this.texte_comment = comments.texte


  // })}

    getAllComments(){
  this.postsService.getAllComments().subscribe((commentaire) => 
  {
    console.log(commentaire);

    

    this.commentaire = commentaire;
  });}



  // postComment(){
  //   window.location.reload();
  //   console.warn(this.comment.value)
  //   this.timelineService.createNewComment(this.comment.value).subscribe((result)=>{
  //     console.warn("Nouveau commentaire créé", result)

  //   })

  // }

}
