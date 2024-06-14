import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NewActivityComponent } from './components/new-activity/new-activity.component';

const routes: Routes = [
{path: '', redirectTo:'login', pathMatch:'full'},
{path: 'login', component:LoginComponent},
{path: 'home', component:HomeComponent},
{path: 'new-activity', component:NewActivityComponent}





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
