import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';

import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import 'firebase/auth';
import 'firebase/firestore';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { promise } from 'protractor';

//Interface for new house object. It will be created with all of these elements
export interface House {
  id?: string,
  name: string,
  address: string,
  eircode: string,
  members: string[]
}

//Interface for calender event
export interface calendarEvent{
  title: '',
  description: '',
  startTime: Date,
  endTime: Date
  allDay: false
}

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  //Initialise necessary objects to store results from Firebase DB
  private houses: Observable<House[]>;
  private houseCollection: AngularFirestoreCollection<House>;
  private callendarEvents: Observable<calendarEvent[]>;
  private callendarCollection: AngularFirestoreCollection<calendarEvent>;

  //test to see did email work, worked when correct, worked when incorrect
  public email = 'ossian@test.ie';

  //Initialise firebase and get collection from DB
  constructor(private afs: AngularFirestore) {
    this.houseCollection = this.afs.collection<House>('house');
    this.houses = this.houseCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  //Function to retrieve user from DB
  getUser(){
    let user = firebase.auth().currentUser;
    if (user){
      return user;
    } else{
      console.log("no user found");
    }
  }


  //funntion to search for user using email
  searchUser(){
    firebase.auth().fetchSignInMethodsForEmail(this.email).then(results => {
      if (results.length === 1){
        //this email is was found
        console.log('this email is was found')
      }
      else{
        console.log('no user with this email')
        //no user with this email / add toast or alert
      }
    });

  }

  //Function to get current user id
  getUserId(){
    let user = firebase.auth().currentUser;
    if (user){
      return user.uid;
    } else{
      console.log("no user found");
    }
  }


  //***HOUSE FUNCTIONS */
  //Get all houses from DB
  getHouses(): Observable<House[]> {
    return this.houses;
  }
  //Get singular house from DB using ID
  getHouse(id: string): Observable<House> {
    return this.houseCollection.doc<House>(id).valueChanges().pipe(
      take(1), //takes one observable as there is no need to keep constantly updated
      map(house => {
        house.id;
        return house
      })
    );
  }
  //Add house object to DB
  addHouse(house: House): Promise<DocumentReference> {
   return this.houseCollection.add(house);
  }
  //Update main attribues of house object in DB
  updateHouse(house: House): Promise<void> {
    return this.houseCollection.doc(house.id).update({ name:house.name, address:house.address, eircode:house.eircode });
  }
  //Delete house from DB
  deleteHouse(id: string): Promise<void> {
    return this.houseCollection.doc(id).delete();
  }

  //***CALENDAR FUNCTIONS */

  //Function to add calendar event.
  //HAVING .COLLECTION('CALENDAR').ADD - IF THERE IS NO COLLECTION IT WILL CREATE ONE, IF THERE IS IT WILL ADD TO IT
  addToCalendar(calendarEvent: calendarEvent, id: string): Promise<DocumentReference>{
    return this.houseCollection.doc(id).collection('calendar').add(calendarEvent);
  }

  //Function to retrieve all calender events from a single house
  //So far getting objects when added. need to map them to display
  getAllCalendarEvents(id : string){
    this.callendarCollection = this.afs.collection('house').doc(id).collection<calendarEvent>('calendar');
    this.callendarEvents = this.callendarCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data};
        });
      })
    );
    return this.callendarEvents;
  }

}
