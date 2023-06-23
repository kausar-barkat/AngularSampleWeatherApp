import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.css'],
})
export class RecentComponent {
  tableData: any;
  showPopup = false;

  constructor(private dataService: DataService, private router: Router) {
  }

  ngOnInit() {
    this.tableData = JSON.parse(localStorage.getItem('recent') ?? '').filter(
      (item: any) => item.isRecent
    );
  }

  sendMessage(value: string) {
    this.dataService.changeMessage(value);
    this.router.navigate(['/home']);
  }

  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  removeAllData() {
    const data = JSON.parse(localStorage.getItem('recent') || '');
    data.forEach((item: any) => {
      item.isRecent = false;
    });

    localStorage.setItem('recent', JSON.stringify(data));
    this.tableData = [];
    localStorage.clear();
  }

  addRemFav(event: Event, value: boolean, city: string) {
    event.stopPropagation();
    if (!localStorage.getItem('recent')) {
      localStorage.setItem('recent', '[]');
    }

    const fav = JSON.parse(localStorage.getItem('recent') || '');
    const existingItemIndex = fav.findIndex((item: any) => item.city === city);

    if (existingItemIndex !== -1) {
      fav[existingItemIndex].isFav = !value;
      localStorage.setItem('recent', JSON.stringify(fav));
    }

    this.tableData = JSON.parse(localStorage.getItem('recent') || '').filter(
      (item: any) => item.isRecent
    );
  }
}
