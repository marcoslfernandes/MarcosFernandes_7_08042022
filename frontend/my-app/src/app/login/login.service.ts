import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({ providedIn: 'root' })
export class LoginService {
  get(id: any) {
    throw new Error('Method not implemented.');
  }

  

  constructor(private http: HttpClient) { }

 
  rootURL="http://localhost:3000/";
 

  getAllUsers(){

return this.http.get('http://localhost:3000/api/auth/users');

  }

  loginUser(data: any){
      
      return this.http.post(this.rootURL+"api/auth/login",data)
     
  }

  }