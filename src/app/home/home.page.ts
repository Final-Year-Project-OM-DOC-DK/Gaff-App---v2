import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';
import { HouseSelectPageModule } from '../house-select/house-select.module';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public afAuth: AngularFireAuth,
              public navCtrl: NavController) {}

  //function for sign out button. Reloads page once user is logged out
  signOut(){
    this.afAuth.auth.signOut().then(() =>{
      location.reload;
    });
  }

  goToSelectHousePage(){
    this.navCtrl.navigateForward('house-select');
  }



}
