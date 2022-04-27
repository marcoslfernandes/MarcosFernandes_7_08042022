import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Groupomania';

  constructor(private appService: AppService){}

  ngOnInit(){
    this.appService.getAllUsers().subscribe(data => 
      {
        for (let i = 0; i < data.length; i++) {
          console.log(data[i].prénom)
        }
         
      });
  }
  
}
