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
  public pastActivities: any[] = [];
  public upcomingActivities: any[] = [];
  public allactivities: any[] = [];
  public students: any[] = [];
  public user: any = "";
  public showModal: boolean = false;
  public selectedActivityId: string = "";
  public selectedActivity: any = null; // Variable para almacenar la actividad seleccionada
  public allUsers: any[] = [];
  constructor(
    private restUserService: RestUserService,
    private restActivityService: RestActivityService
  ) { }

  ngOnInit(): void {
    this.user = this.restUserService.getUser();
    if (!this.user || !this.user._id) {
      console.error('Usuario no inicializado o inválido.');
      return;
    }
    console.log("Datos del usuario:", this.user);
    if (this.user.role === 'ROLE_ADMIN') {
      this.loadAllActivities();
     
      
    } else {
      this.loadUserActivities();
    }
  }

  loadUserActivities(): void {
    this.restActivityService.getAllActivities(this.user._id).subscribe(
      (response) => {
        console.log('HOLA')
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
        this.classifyActivities(); 
        console.log(this.allactivities);
      },
      (error) => {
        console.error('Error loading all activities', error);
      }
    );
  }

  unassignStudent(studentId: string): void {
    this.restActivityService.unassignActivity(this.user._id, this.selectedActivityId, studentId).subscribe(
      (response) => {
        Swal.fire({
          title: 'Desasignado!',
          text: 'El estudiante ha sido desasignado de la actividad.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.viewStudents(this.selectedActivityId); // Recargar la lista de estudiantes después de desasignar
      },
      (error) => {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo desasignar al estudiante. Verifique que la ruta del backend esté correcta.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        console.error('Error unassigning student', error);
      }
    );
  }

  viewStudents(activityId: string): void {
    this.selectedActivityId = activityId;
    this.restActivityService.getActivityUsers(activityId, this.user._id).subscribe(
      (response) => {
        this.students = response.users;
      },
      (error) => {
        console.error('Error loading students', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudieron cargar los estudiantes. Verifique que la ruta del backend esté correcta.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    );
  }
  loadAllUsers(activityId: string): void {
    this.selectedActivityId = activityId;
    this.restActivityService.getAllUsers(this.user._id).subscribe(
      (response) => {
        this.allUsers = response.users;
      },
      (error) => {
        console.error('Error loading all users', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudieron cargar los usuarios. Verifique que la ruta del backend esté correcta.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    );
  }

  assignStudent(studentId: string): void {

    this.restActivityService.assignActivity(this.user._id, this.selectedActivityId, studentId).subscribe(
      (response) => {
        Swal.fire({
          title: 'Asignado!',
          text: 'El estudiante ha sido asignado a la actividad.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.viewStudents(this.selectedActivityId); // Recargar la lista de estudiantes después de asignar
      },
      (error) => {
        Swal.fire({
          title: 'Error',
          text: error.error.message,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        console.error('Error assigning student', error);
      }
    );
  }

  assignSelfToActivity(SelectedActivityId: string): void {
    //console.log("Actividad seleccionada:", SelectedActivityId);
    this.restActivityService.assignByStudent(this.selectedActivity._id, this.user._id).subscribe(
      (response) => {
        Swal.fire({
          title: '¡Actividad asignada!',
          text: 'Te has asignado correctamente a la actividad.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      },
      (error) => {
        Swal.fire({
          title: 'Error',
          text: error.error.message,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        console.error('Error al asignarse a la actividad', error);
      }
    );
  }



  closeModal(): void {
    this.showModal = false;
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
  setSelectedActivity(activity: any): void {
    this.selectedActivity = activity;
    console.log("Actividad seleccionada:", this.selectedActivity);
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

  classifyActivities(): void {
    if (!this.allactivities || this.allactivities.length === 0) {
        console.warn('No hay actividades para clasificar.');
        return;
    }

    const currentDate = new Date();

    this.pastActivities = this.allactivities.filter(activity => {
        const activityDate = new Date(activity.date);
        return activityDate < currentDate;
    });

    this.upcomingActivities = this.allactivities.filter(activity => {
        const activityDate = new Date(activity.date);
        return activityDate >= currentDate;
    });

    console.log('Actividades pasadas:', this.pastActivities);
    console.log('Actividades próximas:', this.upcomingActivities);
}







}
