import { Component, OnInit } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { ParametresService } from './parametres.service';
import { FormGroup, FormControl } from '@angular/forms';

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

  constructor(private parametresService: ParametresService) { }

  ngOnInit(): void {


    
  }

  collection(){
    console.warn(this.register.value)
    this.parametresService.modifyUser(this.register.value).subscribe((result)=>{
      console.warn("Profil modifié !", result)
    })
  }

  deleteUser(item: any){
    console.log("teste!!!!")
    this.parametresService.deleteUser(item).subscribe((result)=>{
        console.warn("result", result)
    })
  }

  faHome = faHome;

}
