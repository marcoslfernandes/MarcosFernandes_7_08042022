import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
 
 

  constructor(private http: HttpClient) { }


  getPostById(id: string | null): Observable<any> {

    return this.http.get(`http://localhost:3000/api/posts/post/${id}`)

  }

  createNewComment(data: any){
    return this.http.post(`http://localhost:3000/api/comment/59`, data)
  }

  getCommentById(id_c: string | null): Observable<any> {

    return this.http.get(` http://localhost:3000/api/comment/${id_c}`)

  }

  getAllComments() {

    return this.http.get('http://localhost:3000/api/comment');

  }

 

}