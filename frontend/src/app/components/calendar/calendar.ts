import {Component} from '@angular/core';

@Component({
  selector: 'app-calendar',
  imports: [],
  templateUrl: './calendar.html',
  standalone: true,
  styleUrl: './calendar.scss'
})
export class Calendar {
  //variable anlegen das das datum speichert/aufnimmt  eine für start eine für enddatum
  //extra button mit jetzt buchen anlegen der funktion auslösen soll, wenn button geklickt, dann in konsole start und enddatum anzeigen soll

  startDate?:Date;
  endDate?:Date;

  dateRangeAusgeben(){
    console.log("Startdatum", this.startDate);
    console.log("Enddatum", this.endDate);
  }

}
