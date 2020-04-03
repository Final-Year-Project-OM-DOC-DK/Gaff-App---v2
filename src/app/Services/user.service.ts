import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { getAttrsForDirectiveMatching } from '@angular/compiler/src/render3/view/util';

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

  //fucntion to update username
  updateUserName(name){
    let user = firebase.auth().currentUser;
    if (user){
     user.updateProfile({
       displayName: name
     })
    } else{
      console.log('no user found');
    }
  }

  //function to update users email
  updateEmail(email){
    let user = firebase.auth().currentUser;
    let credentials;
    return user.reauthenticateWithCredential(credentials).then(function() {
    //return user.updateEmail(email);
    }).catch(function(error) {
      console.log('error authenticating');
    });
  }

  updatePhone(){}



}


