import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  standalone: true,
  styleUrl: './header.scss'
})
export class Header {

  goBack(){
    window.location.href = 'home';
  }
  goToAccomodation(){
    window.location.href = 'accomodation-list';
  }

}
