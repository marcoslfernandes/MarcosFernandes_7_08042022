import { Component, OnInit } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { ParametresService } from './parametres.service';
import { FormGroup, FormControl, FormBuilder,  Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parametres-container',
  templateUrl: './parametres-container.component.html',
  styleUrls: ['./parametres-container.component.css']
})
export class ParametresContainerComponent implements OnInit {

  register=new FormGroup({
    prenom: new FormControl('', Validators.required),
    nom: new FormControl(),
    email: new FormControl(),
    password: new FormControl()
  })

  item: any;
  id: any;
  token: any;


  constructor(private parametresService: ParametresService, private router:Router, private fb: FormBuilder) { }

  ngOnInit(): void {

   this.getID();
    
  }

  // user(){
  //   console.log(localStorage.getItem('user'))
  // }

  collection(){
    this.id = JSON.parse(localStorage.getItem('id') || '{}')
    this.token = JSON.parse(localStorage.getItem('token') || '{}');
    this.parametresService.modifyUser(this.register.value, this.id, this.token).subscribe(()=>{
      console.warn("Profil modifié !")
    })

    if(this.register.valid){
      window.location.reload();
    
    } 
  }

  deleteUser(){
    this.id = JSON.parse(localStorage.getItem('id') || '{}')
    this.token = JSON.parse(localStorage.getItem('token') || '{}');
    this.parametresService.deleteUser(this.id, this.token).subscribe((result)=>{
        console.warn("result", result)
        localStorage.clear();
        this.router.navigate(['/'])
    })

   

    
  }

  getID(){

    let userGet = localStorage.getItem("user")

    console.log(userGet)
  }

  faHome = faHome;

}
