import { Component } from '@angular/core';

import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    NgStyle
  ],
  templateUrl: './home.html',
  standalone: true,
  styleUrls: ['./home.scss']
})
export class Home {

}
