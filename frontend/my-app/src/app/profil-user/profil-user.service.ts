import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfilUserService {
 
 

  constructor(private http: HttpClient) { }





 

  getProjectById(id: string | null): Observable<any> {

    return this.http.get(`http://localhost:3000/api/auth/profil/${id}`)

   
  }

}


