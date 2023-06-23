import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css'],
})
export class FavouriteComponent {
  tableData: any;
  showPopup = false;
  constructor(private dataService: DataService, private router: Router) {}

  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  ngOnInit() {
    this.tableData = JSON.parse(localStorage.getItem('recent') || '').filter(
      (item: any) => item.isFav
    );
  }

  sendMessage(value: string) {
    this.dataService.changeMessage(value);
    this.router.navigate(['/home']);
  }

  removeAllData() {
    const data = JSON.parse(localStorage.getItem('recent') || '');
    data.forEach((item: any) => {
      item.isFav = false;
    });

    localStorage.setItem('recent', JSON.stringify(data));
    this.tableData = [];
  }

  addRemFav(event: Event, value: boolean, city: string) {
    event.stopPropagation()
    if (!localStorage.getItem("recent")) {
      localStorage.setItem("recent", "[]");
    }

    const fav = JSON.parse(localStorage.getItem("recent") || "");
    const existingItemIndex = fav.findIndex((item: any) => item.city === city);

    if (existingItemIndex !== -1) {
      fav[existingItemIndex].isFav = !value;
      localStorage.setItem("recent", JSON.stringify(fav));
    }

    this.tableData = JSON.parse(localStorage.getItem('recent') || "").filter((item: any) => item.isFav)

  }
}
