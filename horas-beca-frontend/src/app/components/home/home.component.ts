import { Component, OnInit } from '@angular/core';
import { RestUserService } from '../../services/rest-user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public activities: any[] = [];
  public allactivities: any[] = [];
  public user: any="";

  constructor(private restUserService: RestUserService) { }

  ngOnInit(): void {
     this.user = this.restUserService.getUser();
   
      this.loadUserActivities();
      this.AllUserActivities();
  }

  loadUserActivities(): void {
    this.restUserService.getUserActivities(this.user._id).subscribe(
      (response) => {
        this.activities = response.activities;
      },
      (error) => {
        console.error('Error loading user activities', error);
      }
    );
  }
  //Ver todas las actividades como administrador
  AllUserActivities(): void {
    this.restUserService.getUserAllActivities(this.user._id).subscribe(
      (response) => {
        this.allactivities = response.activities;
        console.log(this.allactivities);
      },
      (error) => {
        console.error('Error loading user activities', error);
      }
    );
  }


}
