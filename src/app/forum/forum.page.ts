import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
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

  //interface for message object
  message = {
    content: '',
    sender: '',
    time: '',
    photo: ''
  }

  constructor(private afs: AngularFirestore,
              private router: Router,
              private userService: UserService) { 

                    //get ID of house from URL
                    let id1 = this.router.url.split('id=');
                    let id2 = id1[1].toString();
                    let id3 = id2.split('/');
                    let id = id3[0].toString();

                    //initialise DB
                    this.DB = this.afs.collection('house').doc(id).collection('forum');          

                    this.DB.snapshotChanges().subscribe(colSnap => {
                      this.messagesArray = [];
                      colSnap.forEach(snap => {
                        let message: any = snap.payload.doc.data();
                        message.id = snap.payload.doc.id;
                        message.time = new Date(message.time);
                        console.log(message);
                        this.messagesArray.push(message);
                      });
                    });
                  }

  ngOnInit() {
  }

  addMessage(){
    this.message.sender = this.userService.getUser().displayName.toString();
    this.message.time = new Date().toDateString();
    this.DB.add(this.message);
    console.log(this.message);
    this.resetMessage();
  }

  resetMessage(){
    this.message = {
      content: '',
      sender: '',
      time: '',
      photo: ''
    }
  }

  deleteMessage(){
    
  }


}
