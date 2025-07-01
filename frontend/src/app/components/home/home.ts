import { Component } from '@angular/core';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    NgStyle
  ],
  templateUrl: './home.html',
  standalone: true,
  styleUrl: './home.scss'
})
export class Home {

}
