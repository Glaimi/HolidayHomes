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
  goToAccommodation(){
    window.location.href = 'accommodation-list';
  }

  // Change 100 to whatever scroll position you want
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 100;
  }



}
