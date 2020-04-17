import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { House, HouseService } from '../Services/house.service';
import { Router, ActivatedRoute } from '@angular/router';
import { identifierModuleUrl } from '@angular/compiler';
import { Observable } from 'rxjs';
import { UserService } from '../Services/user.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

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

  currentUserId = this.userService.getUserId();
  currentUser = this.userService.getUser();

  memberList = [];
  memberEmailToAdd = '';
  scannedCode = null;

  constructor(private navCtrl : NavController,
              private houseService: HouseService,
              private userService: UserService,
              private toastCtrl: ToastController,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private barcodeScanner: BarcodeScanner) { }

  ngOnInit() {
  }

  //Adds current users UID into string array - members
  //Calls service to add house with details to Firebase DB. 
  //Toast stuff
  addHouse(){
    this.house.members.push(this.currentUserId);
    this.houseService.addHouse(this.house).then(() => {
      this.router.navigateByUrl('/');
      this.showToast('House Added');
    }, err => {
      this.showToast('ERROR: house could not be added');
    });
  }

  //Fucntion to search users
  //add parameter for (user.email)
  searchUser(email){
    this.userService.searchUser(email);
  }



  //Function to create toast
  showToast(msg){
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

  //function to add member to house
  addMember(id){
    this.house.members.push(id);
    this.showToast('Member added to house');
  }

  goToAddMemberPage(){
    this.navCtrl.navigateForward('add-member');
  }

  scanCode(){
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
      this.addMember(this.scannedCode);
      this.showToast('Scan Successful - Member Added!');
    })
  }


}
