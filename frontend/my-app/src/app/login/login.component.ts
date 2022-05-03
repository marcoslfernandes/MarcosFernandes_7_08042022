import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { JsonpClientBackend } from '@angular/common/http';



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
 
  user: any;
  

  
  onClick(){
   
  

      this.loginService.loginUser(this.register.value).subscribe((result)=>{
      
      
        console.log(result)
        
        

        let userSent = JSON.stringify(result) 

              localStorage.setItem("user", userSent)

       
        if(this.register.valid){
          this.isUserLoggedIn = true;
          localStorage.setItem('isUserLoggedIn', this.isUserLoggedIn ? "true" : "false");
          this.router.navigate(['/timeline']);
         
             
        } 
          
        
        
      })
    
  }

}
function id(id: any) {
  throw new Error('Function not implemented.');
}


