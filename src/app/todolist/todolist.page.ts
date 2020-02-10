import { Component, OnInit } from '@angular/core';
import{NavController}from '@ionic/angular';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { HouseService, House } from '../Services/house.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.page.html',
  styleUrls: ['./todolist.page.scss'],
})
export class TodolistPage implements OnInit {
  private house: House;
  selectedPath = 'add-todo';
  constructor(private route:Router, private navCtrl:NavController, private activatedRoute: ActivatedRoute, private houseService: HouseService) {this.route.events.subscribe((event: RouterEvent) => {
    this.selectedPath = event.url;
  }); }

  
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

  gotoAddTodo(){
    this.navCtrl.navigateForward(['/add-todo']);
  }

}
