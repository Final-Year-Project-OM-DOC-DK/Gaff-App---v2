import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HouseService, House } from '../Services/house.service';

@Component({
  selector: 'app-house-details',
  templateUrl: './house-details.page.html',
  styleUrls: ['./house-details.page.scss'],
})
export class HouseDetailsPage implements OnInit {

  private house: House;
  //test
  navigate: any;

 
  constructor(private activatedRoute: ActivatedRoute,
              private houseService: HouseService,
              private route: Router) {
                this.sideMenu();
               }


  //On initialisation of page, use url param (house id from previous page) to get house object from DB
  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(id);
    if (id){
      this.houseService.getHouse(id).subscribe(house => {
        this.house = house;
        console.log(this.house);
        console.log(this.house.address);
      });
    }
  }

  sideMenu() {
    this.navigate = [
      {
        title : "To Do List",
        url : "todolist",
        icon : "checkbox-outline"
      },
      {
        title : "Calander",
        url : "calander",
        icon : ""
      },
      {
        title : "Shopping List",
        url : "shoppinglist",
        icon : ""
      },
      {
        title : "Forum",
        url : "forum",
        icon : ""
      },

    ]
  }

}
