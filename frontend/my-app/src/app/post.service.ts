import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class PostService {

  constructor(private http: HttpClient) { }

  getAllPosts(){

return this.http.get('http://localhost:3000/api/blogs/posts/');

  }

  }