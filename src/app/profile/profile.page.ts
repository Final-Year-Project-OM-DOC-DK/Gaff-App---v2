import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';
import { currentId } from 'async_hooks';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {
  constructor(private userService: UserService,
              private alertCtrl: AlertController) { }

  currentUser;

  ngOnInit() {
    //set currentUser var to User from service.
    this.currentUser = this.userService.getUser();
    console.log(this.currentUser)
  }

 //function to create pop up with input for new username
  async editUsername(){
    const alert = await this.alertCtrl.create({
      message: 'Enter Username',
      inputs: [ 
        {
          name: 'username',
          placeholder: 'Username'
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
          text: 'Confirm',
          handler: (data) => {
            return this.userService.updateUserName(data.username);
          }
        }
      ]
    });
    await alert.present();
  }

  //function to create pop up with input for new username
  async editEmail(){
    const alert = await this.alertCtrl.create({
      message: 'Enter Email',
      inputs: [ 
        {
          name: 'email',
          placeholder: 'yourname@example.ie'
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
          text: 'Confirm',
          handler: (data) => {
            return this.userService.updateEmail(data.email);
          }
        }
      ]
    });
    await alert.present();
  }


}
