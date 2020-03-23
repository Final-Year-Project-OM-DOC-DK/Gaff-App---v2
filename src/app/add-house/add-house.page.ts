import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { House, HouseService } from '../Services/house.service';
import { Router, ActivatedRoute } from '@angular/router';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-add-house',
  templateUrl: './add-house.page.html',
  styleUrls: ['./add-house.page.scss'],
})
export class AddHousePage implements OnInit {

  //initialise house object, define elements of house. no need for Id as it is automatically generated
  house: House = {
  name: '',
  address: '',
  eircode: '',
  members: []
  }

  constructor(private navCtrl : NavController,
              private houseService: HouseService,
              private toastCtrl: ToastController,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  //Adds current users UID into string array - members
  //Calls service to add house with details to Firebase DB. 
  //Toast stuff
  addHouse(){
    let id = this.houseService.getUserId();
    this.house.members.push(id);
    this.houseService.addHouse(this.house).then(() => {
      this.router.navigateByUrl('/');
      this.showToast('House Added');
    }, err => {
      this.showToast('ERROR: house could not be added');
    });
  }


  //Function to create toast
  showToast(msg){
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }


}
