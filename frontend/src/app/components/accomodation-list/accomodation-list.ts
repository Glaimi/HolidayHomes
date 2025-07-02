import {Component, Input} from "@angular/core";
import {AccomodationModel} from '../../interfaces/accomodation-model';

@Component({
  selector: 'app-accomodation-list',
  imports: [],
  templateUrl: './accomodation-list.html',
  standalone: true,
  styleUrl: './accomodation-list.scss'
})
export class AccomodationList {
@Input() accomodation!: AccomodationModel;
}
