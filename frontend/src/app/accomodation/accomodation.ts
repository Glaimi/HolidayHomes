import {Component, Input} from '@angular/core';
import {AccomodationModel} from '../interfaces/accomodation-model';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-accomodation',
  imports: [],
  templateUrl: './accomodation.html',
  standalone: true,
  styleUrl: './accomodation.scss'
})
export class Accomodation {
  @Input() accomodation!: AccomodationModel;

}
