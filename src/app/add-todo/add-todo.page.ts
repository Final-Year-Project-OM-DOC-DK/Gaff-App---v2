import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import{NavController}from '@ionic/angular';
import{ToastController} from '@ionic/angular';
import { House, HouseService } from '../Services/house.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.page.html',
  styleUrls: ['./add-todo.page.scss'],
})



export class AddTodoPage implements OnInit {

  todo_title:string;
  todo_description: string;
  todo_last_date: Date;
  todo_owner: string;

  constructor(private navCtrl: NavController, private toastCtrl:ToastController) { 
  this.todo_owner = firebase.auth().currentUser.uid;
  }
  ngOnInit() {

    firebase.firestore().collection("house").doc("this.house.id").collection("toDoList").add({
      title: this.todo_title,
      description: this.todo_description,
      last_date: this.todo_last_date,
      owner: this.todo_owner,
      created: firebase.firestore.FieldValue.serverTimestamp
      ()
    }).then((docRef) => {
      this.toastCtrl.create({
        message: "toDo has been added!",
        duration: 2000
      }).then((toast) => {
        toast.present();
        this.navCtrl.navigateBack
      })
       }).catch((err) => {
         this.toastCtrl.create({
           message: "ToDo has been Added",
           duration: 3000
         }).then((toast) => {
           toast.present();
         })
         })
       }
    
  }

