import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";
@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.page.html',
  styleUrls: ['./shoppinglist.page.scss'],
})
export class ShoppinglistPage implements OnInit {

  

    constructor(private navCtrl: NavController) { }
  
    ngOnInit() {
    }
    gotoAddToList(){
      this.navCtrl.navigateForward(['/add-tolist']);
    }
  }