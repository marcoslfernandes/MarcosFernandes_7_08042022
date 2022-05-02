import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ParemetresComponent } from './paremetres/paremetres.component';
import { TimelineComponent } from './timeline/timeline.component';
import { ExpenseGuard } from './expense.guard';


const routes: Routes = [

{
  path:'inscription',
  component: InscriptionComponent
},
{
  path:'timeline',
  component: TimelineComponent, canActivate: [ExpenseGuard]
},
{
  path:'parametres',
  component: ParemetresComponent, canActivate: [ExpenseGuard]
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
