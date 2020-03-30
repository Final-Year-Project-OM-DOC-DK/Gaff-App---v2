import { Injectable } from '@angular/core';
import { promise } from 'protractor';
import { DocumentReference, AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { HouseService, House } from './house.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//interface for object to be stored
export interface calendarEvent{
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    allDay: false
}




@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private houses: Observable<House[]>;
  private houseCollection: AngularFirestoreCollection<House>;
  private callendarEvents: Observable<calendarEvent[]>;
  private callendarCollection: AngularFirestoreCollection<calendarEvent>;

  constructor(houseService : HouseService,
              private afs: AngularFirestore) {
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

  //function to update DB 
  updateCalendarCollection(event, id:string){
    //return this.houseCollection.doc(id).collection('calendar');
    //try to replace array
    return this.houseCollection.doc(id).set('calendar');
  }
}
