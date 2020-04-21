import { Component, OnInit } from '@angular/core';
import {NavController, AlertController} from "@ionic/angular";
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../Services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.page.html',
  styleUrls: ['./shoppinglist.page.scss'],
})
export class ShoppinglistPage implements OnInit {

  DB;
  shoppingArray = [];
  currentHouseId;
      //define elements of object
  shoppingList = {
    item: '',
    completed: false
  }

    constructor(private navCtrl: NavController,
                private afs: AngularFirestore,
                private userService: UserService,
                private alertCtrl: AlertController,
                private router: Router) { 

      //get ID of house from URL
      let id1 = this.router.url.split('id=');
      let id2 = id1[1].toString();
      let id3 = id2.split('/');
      let id = id3[0].toString();
      this.currentHouseId = id;
      console.log(id);

      //intiialise DB
      this.DB = this.afs.collection('house').doc(id).collection('shoppingList');
      //subscribe to shopping list data
      this.DB.snapshotChanges().subscribe(colSnap => {
        this.shoppingArray = [];
        colSnap.forEach(snap => {
          let item: any = snap.payload.doc.data();
          item.id = snap.payload.doc.id;
          this.shoppingArray.push(item);
          console.log(item);
        });
      });
    }
  
    ngOnInit() {
    }
      //add item to shoplist function
    addItem(){
      this.DB.add(this.shoppingList);
      this.resetItem();
    }

    //function to delete message from DB
    async deleteItem(item){
    const alert = await this.alertCtrl.create({
      message: 'Are you sure you want to delete this Item?',
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
            this.DB.doc(item).delete()
          }
        }
      ]
    });
    await alert.present();
  }

  //rest item to default values once shoplist item added
    resetItem(){
      this.shoppingList = {
        item: '',
        completed: false
      }
    }
  
  }