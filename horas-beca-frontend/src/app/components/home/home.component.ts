import { Component, OnInit } from '@angular/core';
import { RestUserService } from '../../services/rest-user.service';
import { RestActivityService } from '../../services/rest-activity.service';
import Swal from 'sweetalert2';

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
    private restActivityService: RestActivityService
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

  confirmDeleteActivity(activityId: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteActivity(activityId);
      }
    });
  }

      deleteActivity(activityId: string): void {
        this.restActivityService.deleteActivity(activityId, this.user._id).subscribe(
      (response) => {
        Swal.fire({
          title: 'Eliminada!',
          text: 'La actividad ha sido eliminada.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.loadAllActivities(); // Reload the activities after deletion
      },
      (error) => {
        Swal.fire({
          title: 'Error',
          text: error.error.message,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        console.error('Error deleting activity', error);
      }
    );
  }
}
