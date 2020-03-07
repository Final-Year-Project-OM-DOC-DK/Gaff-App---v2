import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { HouseService, House } from '../Services/house.service';
import { identifierModuleUrl } from '@angular/compiler';

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
    },
    {
      title: 'Calander',
      url: 'calander',
    },
    {
      title: 'Shopping List',
      url: 'shoppinglist',
    },
    {
      title: 'Forum',
      url: 'forum',
    },
    {
      title: 'Bills',
      url: 'bills',
    }
  ];

  selectedPath = '';

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
    if (id) {
      this.houseService.getHouse(id).subscribe(house => {
        this.house = house;
      });
    }
  }

}
