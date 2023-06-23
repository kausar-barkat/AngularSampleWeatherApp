import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  searchText: string = '';

  constructor(private dataService: DataService, private router: Router, private elementRef: ElementRef) { }

  sendMessage(value: string) {
    this.dataService.changeMessage(value);
    this.router.navigate(['/home']);
  }

  isSidebarOpen: boolean = false;
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

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
