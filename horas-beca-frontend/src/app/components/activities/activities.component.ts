import { Component, OnInit } from '@angular/core';
import { RestUserService } from '../../services/rest-user.service';
import { RestActivityService } from '../../services/rest-activity.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.css'
})
export class ActivitiesComponent {
  public activities: any[] = [];
  public allactivities: any[] = [];
  public students: any[] = [];
  public user: any = "";
  public showModal: boolean = false;
  public selectedActivityId: string = "";
  public selectedActivity: any = null; // Variable para almacenar la actividad seleccionada
  public allUsers: any[] = [];

  constructor(
    private restActivityService: RestActivityService
  ) { }

  ngOnInit(): void {
    this.user = this.restActivityService.getUser();
    if (!this.user || !this.user._id) {
      console.error('Usuario no inicializado o inválido.');
      return;
    }
  }

  getAllActivities(): void {
    this.restActivityService.getAllActivities(this.user._id).subscribe(
      (response) => {
        this.activities = response.activities;
      },
      (error) => {
        console.error('Error loading user activities', error);
      }
    );
  }

  


}
