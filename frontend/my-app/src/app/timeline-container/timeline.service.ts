import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publi } from './post.model';



@Injectable({ providedIn: 'root' })
export class TimelineService {



  constructor(private http: HttpClient) { }

  baseURL: string = "http://localhost:3000/";
 

  getAllUsers(){

return this.http.get('http://localhost:3000/api/auth/users');

  }

  getAllPosts(){

    return this.http.get('http://localhost:3000/api/posts/');
    
      }

      getAllComments(){

        return this.http.get('http://localhost:3000/api/comment');
        
          }

      addPost(publi:Publi): Observable<any> {
        const headers = { 'content-type': 'application/json'}  
        const body=JSON.stringify(publi);
        console.log(body)
        return this.http.post(this.baseURL + 'api/posts/53', body,{'headers':headers})
      }

  }