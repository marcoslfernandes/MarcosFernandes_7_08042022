import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfilUserService } from './profil-user.service';


@Component({
  selector: 'app-profil-user',
  templateUrl: './profil-user.component.html',
  styleUrls: ['./profil-user.component.css']
})
export class ProfilUserComponent implements OnInit {
  user: any;
  id: any;
  prenom: any;
  nom: any;
  email: any;




  constructor(private route: ActivatedRoute, private profilUserService: ProfilUserService) {

  }

  ngOnInit(): void {

    this.route.paramMap
    .subscribe(params => {
      let id = params.get('id')
      this.profilUserService.getProjectById(id).subscribe((users) => 
      {

        // const obj = {users};

        // const mapped = Object.keys(obj).map(key => ({type: key, value: obj[key]}));

        // const obj = {users};

        // const mapped = Object.entries(obj).map(([type, value]) => ({type, value}));

        // console.log(mapped);

        console.log(users)

      
        this.prenom = users.prenom
        this.nom = users.nom
        this.email = users.email
      


      })




      })

  }

   
        



}

  
