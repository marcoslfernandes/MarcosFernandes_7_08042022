import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';




@Injectable({ providedIn: 'root' })
export class ParametresService {

    

  constructor(private http: HttpClient) { }

 
  rootURL="http://localhost:3000/";
 


  modifyUser(data: any){
      return this.http.put(this.rootURL+"api/auth/update/57",data)
  }

  deleteUser(id: any){
    return this.http.delete(`${this.rootURL}api/auth/${id}/del`)
  }

  }