import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ParemetresComponent } from './paremetres/paremetres.component';
import { TimelineComponent } from './timeline/timeline.component';


const routes: Routes = [

{
  path:'inscription',
  component: InscriptionComponent
},
{
  path:'timeline',
  component: TimelineComponent
},
{
  path:'parametres',
  component: ParemetresComponent
},
{
  path:'',
  component: HomeComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
