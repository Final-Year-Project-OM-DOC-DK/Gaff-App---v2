import { Component, OnInit, DebugEventListener } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { House, HouseService } from 'src/app/Services/house.service';
import { RouterModule } from '@angular/router';
import { AddHousePage } from '../add-house/add-house.page';
import { HouseDetailsPage } from '../house-details/house-details.page';


@Component({
  selector: 'app-house-select',
  templateUrl: './house-select.page.html',
  styleUrls: ['./house-select.page.scss'],
})
export class HouseSelectPage implements OnInit {

  public houses: Observable<House[]>;
  public userId;

  constructor(public navCtrl: NavController,
              private houseService: HouseService,
              private router: RouterModule) { }

  ngOnInit() {
    this.houses = this.houseService.getHouses();
    this.userId = this.houseService.getUser().uid.toString();
  }

  //Function to navigate to add-house page
  goToAddPage(){
    this.navCtrl.navigateForward('add-house');
  }

  //On select House from this page, navigates forward to the house details page, carrying the id from
  //The selected house, so object is present on next page
  goToHouseDetailsPage(house){
    this.navCtrl.navigateForward(['house-details:id', {id : house.id}]);
  }

}
