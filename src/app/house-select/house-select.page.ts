import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { House, HouseService } from 'src/app/Services/house.service';


@Component({
  selector: 'app-house-select',
  templateUrl: './house-select.page.html',
  styleUrls: ['./house-select.page.scss'],
})
export class HouseSelectPage implements OnInit {

  private houses: Observable<House[]>;

  constructor(public navCtrl: NavController,
              private houseService: HouseService) { }

  ngOnInit() {
    this.houses = this.houseService.getHouses();
  }

}
