import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private postsService: PostsService) { }

  post: any;

  ngOnInit(): void {

  

    this.route.paramMap
    .subscribe(params => {
      let id = params.get('id')
      this.postsService.getPostById(id).subscribe((posts) => 
      {
        this.post = posts
        console.log(posts);


      })




      })



  }

}
