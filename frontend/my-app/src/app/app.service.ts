import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';




@Injectable({ providedIn: 'root' })
export class AppService {

  constructor(private http: HttpClient) { }

  getAllUsers(){

return this.http.get('http://localhost:3000/api/auth/users');

  }

  }




