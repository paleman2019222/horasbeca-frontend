import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NewActivityComponent } from './components/new-activity/new-activity.component';
import { ActivitiesComponent } from './components/activities/activities.component';

const routes: Routes = [
{path: '', redirectTo:'login', pathMatch:'full'},
{path: 'login', component:LoginComponent},
{path: 'home', component:HomeComponent},
{path: 'new-activity', component:NewActivityComponent},
//Samuel activities
{path: 'activities', component:ActivitiesComponent}
//Samuel




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
