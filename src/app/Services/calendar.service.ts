import { Injectable } from '@angular/core';
import { promise } from 'protractor';
import { DocumentReference, AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { HouseService, House } from './house.service';
import { Observable } from 'rxjs';

//interface for object to be stored
export interface calendarEvent{
    title: '',
    description: '',
    startTime: Date,
    endTime: Date,
    allDay: false
}




@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private houseService: HouseService;
  private calendarEvent: calendarEvent;
  private house: Observable<House>;


  private callendarEvents: Observable<calendarEvent[]>;
  private callendarCollection: AngularFirestoreCollection<calendarEvent>;

  constructor(houseService : HouseService,
              private afs: AngularFirestore) {

                
                //this.calendarColection = afs.collection('house').doc;
               }

}
