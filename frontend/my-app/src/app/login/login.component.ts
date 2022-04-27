import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  texteEmail: string = "Email";
  textePassword: string = "Password";
  texteLogin: string = "Login";

  constructor() { }

  ngOnInit(): void {}

  onClick(){
    console.log("Login");
  }

}
