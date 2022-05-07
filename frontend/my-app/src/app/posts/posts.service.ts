import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  createNewComment(data: any, id: any) {
    

    return this.http.post(`http://localhost:3000/api/comment/${id}`, data)
  }

  // getUserById(id: string | null): Observable<any>  {

  //   return this.http.get(`http://localhost:3000/api/auth/profil/${id}`)

  // }

  getAllComments(id_c: any) {

    return this.http.get(`http://localhost:3000/api/comment/${id_c}`);

  }

  deletePost(id: any){

    return this.http.delete(`http://localhost:3000/api/posts/delete/${id}`)

  }

  deleteComment(id: any){

    return this.http.delete(`http://localhost:3000/api/comment/del/${id}`)

    

  }
 

}