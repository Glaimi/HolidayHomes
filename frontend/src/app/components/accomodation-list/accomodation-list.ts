import {Component, inject, OnInit} from "@angular/core";
import { CommonModule } from '@angular/common';
import {AccomodationModel} from '../../interfaces/accomodation-model';
import {AccomodationService} from '../../services/accomodation-service';
import {Accomodation} from '../../accomodation/accomodation';

@Component({
  selector: 'app-accomodation-list',
  imports: [
    CommonModule,
    Accomodation
  ],
  templateUrl: './accomodation-list.html',
  standalone: true,
  styleUrl: './accomodation-list.scss'
})
export class AccomodationList implements OnInit {

  private accomodationService = inject(AccomodationService);
  accomodations: AccomodationModel[] = [];

  // ngOnInit() {
  //   this.accomodationService.getAllAccomodations().subscribe(accomoddationList =>{
  //     this.accomodations = accomoddationList;
  //     console.log(this.accomodations);
  //   })
  // }
  ngOnInit() {
    this.accomodationService.getAllAccomodations().subscribe({
      next: (response) => {
        console.log('Komplette Serverantwort:', JSON.stringify(response, null, 2));
        console.log('Typ der Antwort:', typeof response);
        console.log('Ist es ein Array?', Array.isArray(response));
        console.log('Erstes Element:', response[0]);
        this.accomodations = response;
      },
      error: (error) => {
        console.error('Fehler beim Laden der Unterkünfte:', error);
      }
    });
  }
}
