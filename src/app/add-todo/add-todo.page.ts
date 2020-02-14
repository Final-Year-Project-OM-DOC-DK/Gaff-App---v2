import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import{NavController}from '@ionic/angular';
import{ToastController} from '@ionic/angular';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.page.html',
  styleUrls: ['./add-todo.page.scss'],
})
export class AddTodoPage implements OnInit {

<<<<<<< HEAD
  

=======
>>>>>>> 5dad1eb5db3e8f7ab1d941f9d1f27ee94b128222
  todo_title:string;
  todo_description: string;
  todo_last_date: Date;
  todo_owner: string;

<<<<<<< HEAD
  constructor(private navCtrl:NavController, private toastCtrl:ToastController) { 
   
  this.todo_owner = firebase.auth().currentUser.uid;
  }

  ngOnInit() {
  }

  addTodo(){
=======
  constructor(private navCtrl: NavController, private toastCtrl:ToastController) { 
  this.todo_owner = firebase.auth().currentUser.uid;
  }
  ngOnInit() {
>>>>>>> 5dad1eb5db3e8f7ab1d941f9d1f27ee94b128222

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
<<<<<<< HEAD
        this.navCtrl.setDirection('back');
=======
        this.navCtrl.navigateBack
>>>>>>> 5dad1eb5db3e8f7ab1d941f9d1f27ee94b128222
      })
       }).catch((err) => {
         this.toastCtrl.create({
           message: "ToDo has been Added",
<<<<<<< HEAD
           duration: 2000
         }).then((toast) => {
           toast.present();
           this.navCtrl.setDirection('back');
=======
           duration: 3000
         }).then((toast) => {
           toast.present();
>>>>>>> 5dad1eb5db3e8f7ab1d941f9d1f27ee94b128222
         })
         })
       }
    
  }

<<<<<<< HEAD

=======
>>>>>>> 5dad1eb5db3e8f7ab1d941f9d1f27ee94b128222
