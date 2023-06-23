import { Component } from '@angular/core';
import { DataService } from '../data.service';
import axios from 'axios';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  newMessage: any;
  oldMeesage: any = '';
  weatherData: any = {
    temperature: '',
    city: '',
    state: '',
    weatherText: '',
    weatherIcon: '',
    celsius: '',
    fahrenheit: '',
    percipitation: '',
    humiditiy: '',
    wind: '',
    visibility: '',
    isFav: false,
    isRecent: true,
  };
  isCelsius = true;

  ngDoCheck() {
    if (this.newMessage !== this.oldMeesage) {
      this.oldMeesage = this.newMessage;
      this.getWeatherData();
    }
  }

  constructor(private dataService: DataService) { }

  async getWeatherData() {
    const json: any = localStorage.getItem("recent");
    const recent = JSON.parse(json);
    const isNewData = !recent || !recent.some((item: any) => item.city === this.newMessage);
    if (isNewData) {
      const apiKey = "ecd5051be3msh03f77ae88ada53ep192915jsne39d3aac3a07";
      const url = `https://weatherapi-com.p.rapidapi.com/current.json`;
      await axios
        .get(url, {
          headers: {
            "X-RapidAPI-Key": `${apiKey}`,
            "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com"
          },
          params: {
            q: `${this.newMessage}`
          }
        })
        .then((response: any) => {
          this.weatherData.temperature = Math.round(
            response.data.current.temp_c
          );
          this.weatherData.celsius = Math.round(response.data.current.temp_c);
          this.weatherData.farenheit = Math.round(response.data.current.temp_f);
          this.weatherData.city = response.data.location.name;
          this.weatherData.state = response.data.location.region;
          this.weatherData.weatherIcon = response.data.current.condition.icon;
          this.weatherData.weatherText = response.data.current.condition.text;
          this.weatherData.percipitation = response.data.current.precip_in;
          this.weatherData.humidity = response.data.current.humidity;
          this.weatherData.wind = response.data.current.wind_mph;
          this.weatherData.visibility = response.data.current.vis_miles;
          this.weatherData.isRecent = true;
          if (!localStorage.getItem('recent')) {
            this.weatherData.isFav = false
          } else {
            let favData: any = JSON.parse(localStorage.getItem('recent') || "");
            let isFav = favData.filter((fav: any) => {
              return fav.city === this.weatherData.city;
            });
            if (isFav && isFav[0]) {
              this.weatherData.isFav = isFav[0].isFav;
            } else {
              this.weatherData.isFav = false;
            }
          }
          if (!localStorage.getItem("recent")) {
            localStorage.setItem("recent", "[]");
          }
          const json: any = localStorage.getItem("recent");
          const recent = JSON.parse(json);
          const isNewData = !recent || !recent.some((item: any) => item.city === this.weatherData.city);
          if (isNewData) {
            recent.push(this.weatherData);
            localStorage.setItem("recent", JSON.stringify(recent));
          } else {
            const existingItemIndex = recent.findIndex((item: any) => item.city === this.weatherData.city);
            if (existingItemIndex !== -1) {
              recent[existingItemIndex].isRecent = this.weatherData.isRecent;
              localStorage.setItem("recent", JSON.stringify(recent));
            }
          }
        })
        .catch((error: any) => {
          console.log(error);
        });
    } else {
      const oldData = recent.filter((item: any) => item.city === this.newMessage)
      this.weatherData = oldData[0];
    }
  }

  ngOnInit() {
    this.dataService.currentMessage.subscribe(message => this.newMessage = message);
  }

  addRemFav(value: boolean) {
    this.weatherData.isFav = value;

    if (!localStorage.getItem("recent")) {
      localStorage.setItem("recent", "[]");
    }

    const fav = JSON.parse(localStorage.getItem("recent") || "");
    const existingItemIndex = fav.findIndex((item: any) => item.city === this.weatherData.city);

    if (existingItemIndex !== -1) {
      fav[existingItemIndex].isFav = value;
      localStorage.setItem("recent", JSON.stringify(fav));
    }
  }
}
