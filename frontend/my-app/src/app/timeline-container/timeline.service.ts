import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publi } from './post.model';



@Injectable({ providedIn: 'root' })
export class TimelineService {



  constructor(private http: HttpClient) { }

  rootURL: string = "http://localhost:3000/";
 

  getAllUsers(){

return this.http.get('http://localhost:3000/api/auth/users');

  }

  getAllPosts(){

    return this.http.get('http://localhost:3000/api/posts/');
    
      }

      getAllComments(){

        return this.http.get('http://localhost:3000/api/comment');
        
          }

          createNewPost(data: any){
            return this.http.post(this.rootURL+"api/posts/53",data)
        }

  }