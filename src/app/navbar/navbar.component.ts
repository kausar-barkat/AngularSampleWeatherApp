import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  today: number = Date.now();
  navbarItems = [
    {
      label: 'HOME', link: '/'
    },
    {
      label: 'FAVOURITE', link: '/favourite'
    },
    {
      label: 'RECENT SEARCH', link: '/recent'
    }
  ];
}
