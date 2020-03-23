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
  members: [],
  //bills: {},
  //calander: {},
  //forum: {},
  //shoppingList: {},
  //toDoList: {}
  }

  constructor(private navCtrl : NavController,
              private houseService: HouseService,
              private toastCtrl: ToastController,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  //on initialisation get current usr id, to be used as the first "member" of the house
  ngOnInit() {
    let id = this.houseService.getUserId();
    console.log(id);
    this.house.members.push(id);
  }

  //calls service to add house with details to Firebase DB. 
  addHouse(){
    this.houseService.addHouse(this.house).then(() => {
      this.router.navigateByUrl('/');
      //toast stuff
      this.showToast('House Added');
    }, err => {
      this.showToast('ERROR: house could not be added');
    });
  }


  //function to create toast
  showToast(msg){
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }


}
