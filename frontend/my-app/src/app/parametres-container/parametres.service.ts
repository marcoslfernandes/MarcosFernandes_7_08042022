import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';




@Injectable({ providedIn: 'root' })
export class ParametresService {

    

  constructor(private http: HttpClient) { }

 
  rootURL="http://localhost:3000/";
 
 

  modifyUser(data: any, id: any, token: any): Observable<any> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
      return this.http.put(this.rootURL+`api/auth/update/${id}`, data, { headers: header })
  }


  deleteUser(id: any, token: any): Observable<any> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.delete(`${this.rootURL}api/auth/${id}/del`, { headers: header })
  }

  }