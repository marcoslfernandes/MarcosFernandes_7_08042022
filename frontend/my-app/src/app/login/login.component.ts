import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  register=new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

 

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {}

  isUserLoggedIn: boolean = false;

  onClick(){
   
  

      this.loginService.loginUser(this.register.value).subscribe((result)=>{

        console.log("Login", result)
        // localStorage.setItem('token', result.token)
       
        if(this.register.valid){
          this.isUserLoggedIn = true;
          localStorage.setItem('isUserLoggedIn', this.isUserLoggedIn ? "true" : "false");
          this.router.navigate(['/timeline']);
        } 
          
        
        
      })
    
  }

}
