import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { HouseService, House } from '../Services/house.service';
import { identifierModuleUrl } from '@angular/compiler';
import { NavController, MenuController } from '@ionic/angular';

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
      url: 'todolist'
    },
    {
      title: 'Calendar',
      url: 'calander'
    },
    {
      title: 'Shopping List',
      url: 'shoppinglist'
    },
    {
      title: 'Forum',
      url: 'forum'
    },
    {
      title: 'Bills',
      url: 'bills'
    },
    {
      title: 'Settings',
      url: 'settings'
    },
    {
      title: 'Exit',
      url: 'home'
    }
  ];

  selectedPath = '';

  constructor(private activatedRoute: ActivatedRoute,
    private houseService: HouseService,
    private router: Router,
    public navCtrl: NavController,
    public menuCtrl : MenuController) {

    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url){
        this.selectedPath = event.url;
      }
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


  //to fix menu toggle bug ****************************
  refresh(){
    location.replace(this.selectedPath);
    
  }

}
