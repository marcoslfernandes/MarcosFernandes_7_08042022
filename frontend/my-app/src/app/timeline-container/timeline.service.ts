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

  getAllPosts(): Observable<any> {

    return this.http.get('http://localhost:3000/api/posts/');
   

  }

  getAllComments() {

    return this.http.get('http://localhost:3000/api/comment');

  }

  createNewPost(data: any, id: any) {
    return this.http.post(`${this.rootURL}api/posts/${id}`, data)
  }

  getUserById(id: string | null): Observable<any> {

    return this.http.get(`http://localhost:3000/api/auth/profil/${id}`)

  }

  // {"Authorization": Bearer token}

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
 
    // return this.http.delete(`${this.rootURL}api/blogs/del/39`)
  }


 
 
}



