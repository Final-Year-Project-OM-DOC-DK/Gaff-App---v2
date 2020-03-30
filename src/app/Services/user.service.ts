import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afs: AngularFirestore) { }


  //Function to retrieve user from DB
  getUser() {
    let user = firebase.auth().currentUser;
    if (user) {
      return user;
    } else {
      console.log("no user found");
    }
  }

  //Function to get current user id
  getUserId() {
    let user = firebase.auth().currentUser;
    if (user) {
      return user.uid;
    } else {
      console.log("no user found");
    }
  }



}


