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



  constructor(private route: ActivatedRoute, private profilUserService: ProfilUserService) {

  }

  ngOnInit(): void {

    this.route.paramMap
    .subscribe(params => {
      let id = params.get('id')
      this.profilUserService.getProjectById(id).subscribe((users) => 
      {
        this.user = users
        console.log(users);


      })




      })

  }

   
        



}

  
