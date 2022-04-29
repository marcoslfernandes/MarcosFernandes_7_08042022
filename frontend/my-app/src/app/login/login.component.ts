import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  register=new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {}

  onClick(){
   
      console.warn(this.register.value)
      this.loginService.loginUser(this.register.value).subscribe((result)=>{
        console.warn("Login", result)
      })
    
  }

}
