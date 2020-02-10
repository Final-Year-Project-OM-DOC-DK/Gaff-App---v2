import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { HouseService, House } from '../Services/house.service';

@Component({
  selector: 'app-house-details',
  templateUrl: './house-details.page.html',
  styleUrls: ['./house-details.page.scss'],
})
export class HouseDetailsPage implements OnInit {

  private house: House;
  pages = [
    {
      title: 'To Do List',
      url: 'todolist',
      icon: 'checkbox-outline'
    },
    {
      title: 'Calander',
      url: 'calander',
      icon: 'calendar'
    },
    {
      title: 'Shopping List',
      url: 'shoppinglist',
      icon: 'paper'
    },
    {
      title: 'Forum',
      url: 'forum',
      icon: 'chatboxes'
    },
    {
      title: 'Bills',
      url: 'bills',
      icon: 'logo-euro'
    }
  ];

  selectedPath = 'todolist';

  constructor(private activatedRoute: ActivatedRoute,
    private houseService: HouseService,
    private route: Router) {

    this.route.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
  }//end constructor

  //On initialisation of page, use url param (house id from previous page) to get house object from DB
  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(id);
    if (id) {
      this.houseService.getHouse(id).subscribe(house => {
        this.house = house;
        console.log(this.house);
        console.log(this.house.address);
      });
    }
  }

}
