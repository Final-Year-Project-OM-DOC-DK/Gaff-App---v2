import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';

import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import 'firebase/auth';
import 'firebase/firestore';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from '@angular/fire/firestore';

export interface House {
  id?: string,
  name: string,
  members: string[]
}

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  private houses: Observable<House[]>;
  private houseCollection: AngularFirestoreCollection<House>;

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

  getHouses(): Observable<House[]> {
    return this.houses;
  }

  getHouse(id: string): Observable<House> {
    return this.houseCollection.doc<House>(id).valueChanges().pipe(
      take(1), //takes one observable as there is no need to keep constantly updated
      map(house => {
        house.id;
        return house
      })
    );
  }

  addHouse(house: House): Promise<DocumentReference> {
    return this.houseCollection.add(house);
  }

  updateHouse(house: House): Promise<void> {
    return this.houseCollection.doc(house.id).update({ name: house.name, members: house.members });
  }

  deleteHouse(id: string): Promise<void> {
    return this.houseCollection.doc(id).delete();
  }

}
