import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';

import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import 'firebase/auth';
import 'firebase/firestore';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

//interface for new house object. It will be created with all of these elements
export interface House {
  id?: string,
  name: string,
  address: string,
  eircode: string,
  //members: string[],
  //bills: {},
  //calander: {},
  //forum: {},
  //shoppingList: {},
  //toDoList: {}
}

//interface for calender event
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

  //initialise necessary objects to store results from Firebase DB
  private houses: Observable<House[]>;
  private houseCollection: AngularFirestoreCollection<House>;
  private callendarEvents: Observable<calendarEvent[]>;
  private callendarCollection: AngularFirestoreCollection<calendarEvent>;

  //initialise firebase and get collection from DB
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


  //***HOUSE FUNCTIONS */
  //get all houses from DB
  getHouses(): Observable<House[]> {
    return this.houses;
  }
  //get singular house from DB using ID
  getHouse(id: string): Observable<House> {
    return this.houseCollection.doc<House>(id).valueChanges().pipe(
      take(1), //takes one observable as there is no need to keep constantly updated
      map(house => {
        house.id;
        return house
      })
    );
  }
  //add house object to DB
  addHouse(house: House): Promise<DocumentReference> {
   return this.houseCollection.add(house);
  }
  //update main attribues of house object in DB
  updateHouse(house: House): Promise<void> {
    return this.houseCollection.doc(house.id).update({ name:house.name, address:house.address, eircode:house.eircode });
  }
  //delete house from DB
  deleteHouse(id: string): Promise<void> {
    return this.houseCollection.doc(id).delete();
  }

  //***CALENDAR FUNCTIONS */

  //function to add calendar event.
  //HAVING .COLLECTION('CALENDAR').ADD - IF THERE IS NO COLLECTION IT WILL CREATE ONE, IF THERE IS IT WILL ADD TO IT
  addToCalendar(calendarEvent: calendarEvent, id: string): Promise<DocumentReference>{
    return this.houseCollection.doc(id).collection('calendar').add(calendarEvent);
  }

  //function to retrieve all calender events from a single house
  //so far getting objects when added. need to map them to display
  getAllCalendarEvents(id : string){
    //this.houseCollection.doc(id).collection('calendar').snapshotChanges().subscribe(result =>{
    // console.log(result);
    // return result;
    // ABOVE WAY GOT BACK SETS OF DATA WITH NO VALUES
    //TRYING TO DO IT THE SAME WAY AS THE CONSTRUCTOR IN THIS SERVICE
    this.callendarCollection = this.afs.collection('house').doc(id).collection<calendarEvent>('calendar');
    this.callendarEvents = this.callendarCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          //console.log(data);
          const id = a.payload.doc.id;
          //console.log(id);
          return { id, ...data};
        });
      })
    );
    return this.callendarEvents;
  }

}
