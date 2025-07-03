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

  ngOnInit() {
    this.accomodationService.getAllAccomodations().subscribe(accomoddationList =>{
      this.accomodations = accomoddationList;
      console.log(this.accomodations);
    })
  }
}
