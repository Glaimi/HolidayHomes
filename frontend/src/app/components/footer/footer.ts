import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  standalone: true,
  styleUrl: './footer.scss',

})
export class Footer {

  constructor(private router: Router) {}

  goToImprint(event: Event){
    event.preventDefault();
    this.router.navigate(['/imprint']);
  }

  goToDataPrivacy(event: Event){
    event.preventDefault();
    this.router.navigate(['privacy']);
  }


}
