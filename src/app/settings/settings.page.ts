import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { House, HouseService } from '../Services/house.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  //Initiate variables
  currentHouse : House;
  currentHouseId : string;
  currentUser;
  currentUserId;

  //Initialise modules
  constructor(private navCtrl: NavController,
              private router: Router,
              private activatedRoute : ActivatedRoute,
              private houseService : HouseService,
              public alertController : AlertController) { }

  //On init, split url to get id of house            
  ngOnInit() {
    let id1 = this.router.url.split('id=');
    let id2 = id1[1].toString();
    let id3 = id2.split('/');
    let id = id3[0].toString();
    //Use Id to get current house object and its Id
    this.houseService.getHouse(id);
    if (id){
      this.houseService.getHouse(id).subscribe(house => {
      this.currentHouse = house;
      this.currentHouseId = id;
      });
  }//end if
 }//end on init

 //Function for alert


 //Function to delete House
 async deleteHouse(){

  const alert = await this.alertController.create({
    message: 'Are you sure you want to permanently delete this house?',
    buttons: [
      {
        text: 'No',
        handler: () => {
        return;
        }
      },
      {
        text: 'Yes',
        handler: () => {
          this.houseService.deleteHouse(this.currentHouseId);
          this.navCtrl.navigateBack('house-select');
        }
      }
    ]
  });
 await alert.present();
 }



}//end class
