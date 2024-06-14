import { Component } from '@angular/core';
import { RestActivityService } from '../../services/rest-activity.service';
import { Activity } from '../../models/activity.model';

@Component({
  selector: 'app-new-activity',
  templateUrl: './new-activity.component.html',
  styleUrl: './new-activity.component.css'
})
export class NewActivityComponent {
  public user: any = "";
  public newActivity: Activity = new Activity('', '', '', '', '');

  constructor(private restActivityService: RestActivityService) {}

  ngOnInit(): void {
    this.user = this.restActivityService.getUser();
  }
  onSubmit(): void {
    this.restActivityService.addActivity(this.newActivity, this.user._id).subscribe(
      (response) => {
        console.log('Actividad agregada correctamente:', response);
      },
      (error) => {
        console.error('Error al agregar actividad:', error);
      }
    );
  }

}
