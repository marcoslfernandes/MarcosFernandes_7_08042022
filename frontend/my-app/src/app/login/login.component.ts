import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { ActivatedRoute, Router } from '@angular/router';
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

 

  constructor(private loginService: LoginService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.loggedIn()

  }

  isUserLoggedIn: boolean = false;
 
  user: any;
  local!: string;
  result: any;
  user_id: any;
  token: any;
 
  
  loggedIn(){
    let val = localStorage.getItem('isUserLoggedIn');
    if(val != null && val == "true"){
      this.router.navigate(['/timeline'])
    }
  }
  
  onClick(){
   
  

      this.loginService.loginUser(this.register.value).subscribe((result)=>{
      
      
        // console.warn(result.id)
        // console.warn(result.token)
          
        

        
        // console.log(this.route.snapshot.paramMap.get('id'))
        

        this.user_id = result.id
        this.token = result.token

        localStorage.setItem('id', JSON.stringify(this.user_id))
        localStorage.setItem('token', JSON.stringify(this.token))

      
        

        //  this.local = localStorage.getItem('user')!=null ? localStorage.getItem('user'):"";

         
       
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


