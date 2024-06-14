import { Component, OnInit } from '@angular/core';
import { RestUserService } from '../../services/rest-user.service';
import { RestActivityService } from '../../services/rest-activity.service'; // Asegúrate de importar el servicio

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public activities: any[] = [];
  public allactivities: any[] = [];
  public user: any = "";

  constructor(
    private restUserService: RestUserService,
    private restActivityService: RestActivityService // Asegúrate de inyectar el servicio
  ) {}

  ngOnInit(): void {
    this.user = this.restUserService.getUser();
    this.loadUserActivities();
    this.loadAllActivities();
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

  loadAllActivities(): void {
    this.restUserService.getUserAllActivities(this.user._id).subscribe(
      (response) => {
        this.allactivities = response.activities;
        console.log(this.allactivities);
      },
      (error) => {
        console.error('Error loading all activities', error);
      }
    );
  }

  deleteActivity(activityId: string): void {
    this.restActivityService.deleteActivity(activityId, this.user._id).subscribe(
      (response) => {
        console.log('Activity deleted successfully');
        this.loadAllActivities(); // Reload the activities after deletion
      },
      (error) => {
        console.error('Error deleting activity', error);
      }
    );
  }
}
