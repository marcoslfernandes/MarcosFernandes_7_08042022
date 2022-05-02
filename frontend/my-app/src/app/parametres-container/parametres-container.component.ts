import { Component, OnInit } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { ParametresService } from './parametres.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parametres-container',
  templateUrl: './parametres-container.component.html',
  styleUrls: ['./parametres-container.component.css']
})
export class ParametresContainerComponent implements OnInit {

  register=new FormGroup({
    prenom: new FormControl(),
    nom: new FormControl(),
    email: new FormControl(),
    password: new FormControl()
  })

  item: any;

  constructor(private parametresService: ParametresService, private router:Router) { }

  ngOnInit(): void {


    
  }

  collection(){
    
    this.parametresService.modifyUser(this.register.value).subscribe(()=>{
      console.warn("Profil modifié !")
    })

    if(this.register.valid){
      this.router.navigate(['/timeline']);
    } 
  }

  deleteUser(item: any){
    console.log("teste!!!!")
    this.parametresService.deleteUser(item).subscribe((result)=>{
        console.warn("result", result)
    })
  }

  faHome = faHome;

}
