import { Component } from '@angular/core';
import {Router} from '@angular/router';

// This component represents the application footer.
@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  standalone: true,
  styleUrls: ['./footer.scss'], // Changed styleUrl to styleUrls

})
export class Footer {

  // The constructor initializes the component with the router.
  constructor(private router: Router) {}

  // Navigates to the imprint page.
  goToImprint(event: Event){
    event.preventDefault();
    this.router.navigate(['/imprint']);
  }

  // Navigates to the data privacy page.
  goToDataPrivacy(event: Event){
    event.preventDefault();
    this.router.navigate(['privacy']);
  }


}
