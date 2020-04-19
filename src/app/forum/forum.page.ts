import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.page.html',
  styleUrls: ['./forum.page.scss'],
})
export class ForumPage implements OnInit {

  //array to hold objects retrieved from DB
  messagesArray = [];
  DB;
  currentHouseId;

  //interface for message object
  message = {
    content: '',
    sender: '',
    time: '',
    photo: ''
  }

  constructor(private afs: AngularFirestore,
              private router: Router,
              private userService: UserService,
              private alertCtrl: AlertController,
              private menuCtrl: MenuController) { 

                    //get ID of house from URL
                    let id1 = this.router.url.split('id=');
                    let id2 = id1[1].toString();
                    let id3 = id2.split('/');
                    let id = id3[0].toString();
                    this.currentHouseId = id;

                    //initialise DB
                    this.DB = this.afs.collection('house').doc(id).collection('forum');          
                    //subscribe to DB, add each to empty array. Change data within to fit output fields
                    this.DB.snapshotChanges().subscribe(colSnap => {
                      this.messagesArray = [];
                      colSnap.forEach(snap => {
                        let message: any = snap.payload.doc.data();
                        message.id = snap.payload.doc.id;
                        message.time = new Date(message.time).toString().substring(0,15);
                        this.messagesArray.push(message);
                      });
                    });
                  }

  ngOnInit() {
  }

  //function to add message to DB and reset to current values once finished
  addMessage(){
    this.message.sender = this.userService.getUser().displayName.toString();
    this.message.time = new Date().toDateString();
    this.DB.add(this.message);
    console.log(this.message);
    this.resetMessage();
  }

  //fucntion to reset message object to default values
  resetMessage(){
    this.message = {
      content: '',
      sender: '',
      time: '',
      photo: ''
    }
  }

  //function to delete message from DB
  async deleteMessage(item){
    const alert = await this.alertCtrl.create({
      message: 'Are you sure you want to delete this message?',
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
            let DB = this.afs.collection('house').doc(this.currentHouseId).collection('forum').doc(item).delete();
          }
        }
      ]
    });
    await alert.present();
  }


}
