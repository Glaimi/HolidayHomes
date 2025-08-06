import {Component, HostListener} from '@angular/core';

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

  // Change the scroll position threshold to the desired value
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 100;
  }



}
