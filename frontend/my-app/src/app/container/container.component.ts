import { Component, OnInit } from '@angular/core';
import { InscriptionService } from './container.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {

 
  register=new FormGroup({
    prenom: new FormControl(),
    nom: new FormControl(),
    email: new FormControl(),
    password: new FormControl()
  })

userData: any;

  constructor(private inscriptionService: InscriptionService){}

  ngOnInit(): void {

  
    

    this.inscriptionService.getAllUsers().subscribe((users) => 
    {
      console.log(users);
      // this.User = users;
    });

  }

  collection(){
    console.warn(this.register.value)
    this.inscriptionService.createNewUser(this.register.value).subscribe((result)=>{
      console.warn("Nouvel utilisateur créé", result)
    })
  }

}
