import {Component, HostListener} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  standalone: true,
  styleUrl: './header.scss'
})
export class Header {

  isScrolled = false;


  goBack(){
    window.location.href = 'home';
  }
  goToAccomodation(){
    window.location.href = 'accomodation-list';
  }

  // Change 100 to whatever scroll position you want
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 100;
  }



}
