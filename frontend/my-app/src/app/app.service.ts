import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Users{
  prénom: string;
  nom: string;
}


@Injectable({ providedIn: 'root' })
export class AppService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<Users[]>{

return this.http.get<Users[]>('http://localhost:3000/api/auth/users');

  }

  }




