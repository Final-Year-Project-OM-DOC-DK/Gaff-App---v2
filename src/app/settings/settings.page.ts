import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { House, HouseService } from '../Services/house.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

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

  scannedCode = null;

  //Initialise modules
  constructor(private navCtrl: NavController,
              private router: Router,
              private activatedRoute : ActivatedRoute,
              private houseService : HouseService,
              public alertController : AlertController,
              private barcodeScanner: BarcodeScanner) { }

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

 //fucntion to scan barcode
 scanCode(){
  this.barcodeScanner.scan().then(barcodeData => {
    this.scannedCode = barcodeData.text;
    this.currentHouse.members.push(this.scannedCode);
    this.alertController.create({
      message: 'Successfully added member to Gaff',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            return;
          }
        }
      ]
    })
  })
 }


 //async function to edit house details
 async editHouse(){
   const alert = await this.alertController.create({
     message: 'Update Details',
     inputs: [
       {
         name:'name',
         placeholder: this.currentHouse.name
       },
       {
         name: 'address',
         placeholder: this.currentHouse.address
       },
       {
         name:'eircode',
         placeholder: this.currentHouse.eircode
       }
     ],
     buttons: [
       {
         text: 'cancel',
         handler: () => {
           return;
         }
       },
       {
         text: 'Update',
         handler: (data) => { //if != null
          if (data.name.length > 0){
            this.currentHouse.name = data.name;
          }
          if (data.address.length > 0){
            this.currentHouse.address = data.address;
          }
          if (data.eircode > 0){
            this.currentHouse.eircode = data.eircode;
          }
           console.log(this.currentHouse);
           return this.houseService.updateHouse(this.currentHouse, this.currentHouseId);
         }
       }
     ]
   });
   await alert.present();
 }



}//end class
