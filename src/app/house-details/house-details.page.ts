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
 
  constructor(private activatedRoute: ActivatedRoute,
              private houseService: HouseService,
              private route: Router) { }

  //*****not fully working, wont get param */
  //On initialisation of page, use url param (house id from previous page) to get house object from DB
  ngOnInit() {
    console.log(this.activatedRoute.snapshot.paramMap.get('id'));
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id){
      this.houseService.getHouse(id).subscribe(house => {
        this.house = house;
      });
    }
  }

}
