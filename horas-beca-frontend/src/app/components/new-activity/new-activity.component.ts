import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RestActivityService } from '../../services/rest-activity.service';
import { Activity } from '../../models/activity.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-activity',
  templateUrl: './new-activity.component.html',
  styleUrls: ['./new-activity.component.css']
})
export class NewActivityComponent {
  public user: any = "";
  public newActivity: Activity = new Activity('', '', '', '', '');

  constructor(
    private restActivityService: RestActivityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.restActivityService.getUser();
  }

  onSubmit(): void {
    this.restActivityService.addActivity(this.newActivity, this.user._id).subscribe(
      (response) => {
        Swal.fire({
          title: 'Éxito!',
          text: 'Actividad agregada correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          this.newActivity = new Activity('', '', '', '', ''); // Limpiar el formulario
          this.router.navigate(['/home']); // Redirigir al home
        });
      },
      (error) => {
        Swal.fire({
          title: 'Error',
          text: error.error.message || 'Hubo un error al agregar la actividad.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        console.error('Error al agregar actividad:', error);
      }
    );
  }
}
