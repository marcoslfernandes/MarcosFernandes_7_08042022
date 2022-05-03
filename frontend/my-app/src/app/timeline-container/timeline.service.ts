import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publi } from './post.model';



@Injectable({ providedIn: 'root' })
export class TimelineService {



  constructor(private http: HttpClient) { }

  rootURL: string = "http://localhost:3000/";


  getAllUsers() {

    return this.http.get('http://localhost:3000/api/auth/users');

  }

  getAllPosts() {

    return this.http.get('http://localhost:3000/api/posts/');
   

  }

  getAllComments() {

    return this.http.get('http://localhost:3000/api/comment');

  }

  createNewPost(data: any) {
    return this.http.post(`${this.rootURL}api/posts/63`, data)
  }

  createNewComment(data: any){
    return this.http.post(`${this.rootURL}/api/comment/58`, data)
  }

  upload(file: string | Blob): Observable<any> {

    // Create form data
    const formData = new FormData();

    // Store form name as "file" with file data
    formData.append("file", file);

    // Make http post request over api
    // with formData as req
    return this.http.post(this.rootURL + "/images", formData)
  }



  deletePost(){
    console.log("teste")
    // return this.http.delete(`${this.rootURL}api/blogs/del/39`)
  }


 
 
}



