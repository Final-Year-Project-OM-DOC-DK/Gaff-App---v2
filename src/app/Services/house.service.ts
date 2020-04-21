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


@Injectable({
  providedIn: 'root'
})
export class HouseService {

  //Initialise necessary objects to store results from Firebase DB
  private houses: Observable<House[]>;
  private houseCollection: AngularFirestoreCollection<House>;

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
  updateHouse(house: House, id): Promise<void> {
    console.log(house);
    return this.houseCollection.doc(id).update({ name:house.name, address:house.address, eircode:house.eircode});
  }
  //Delete house from DB
  deleteHouse(id: string): Promise<void> {
    return this.houseCollection.doc(id).delete();
  }

}
