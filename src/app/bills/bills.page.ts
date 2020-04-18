import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { HouseService } from '../Services/house.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.page.html',
  styleUrls: ['./bills.page.scss'],
})
export class BillsPage implements OnInit {

  minDate = new Date().toISOString();
  payee: '';
  currentHouse;
  DB;
  billsArray = [];

  bill = {
    title: '',
    amount: null,
    dueDate: new Date().toISOString(),
    payees: [],
    repeat: ''
  }

  constructor(private afs: AngularFirestore,
              private router: Router,
              private houseService: HouseService,
              private userService: UserService) { 
      
                //get ID of house from URL
                let id1 = this.router.url.split('id=');
                let id2 = id1[1].toString();
                let id3 = id2.split('/');
                let id = id3[0].toString();
                console.log(id);              

  //initialise DB             
  this.DB = this.afs.collection('house').doc(id).collection('bills');
  
  this.DB.snapshotChanges().subscribe(colSnap => {
    this.billsArray = [];
    colSnap.forEach(snap => {
      let bill: any = snap.payload.doc.data();
      bill.id = snap.payload.doc.id;
      bill.dueDate = new Date(bill.dueDate);
      this.billsArray.push(bill);
      console.log(bill);
    });
  });

  }//end constructor

  ngOnInit() {
  }

  addPayee(payee){
    this.bill.payees.push(payee);
    this.payee = '';
  }

  addBill(){
    this.DB.add(this.bill);
    this.resetBill();
  }

  //fucntion to reset values of bill object
  resetBill(){
    this.bill = {
      title: '',
      amount: null,
      dueDate: new Date().toISOString(),
      payees: [],
      repeat: ''
    }
  }


}
