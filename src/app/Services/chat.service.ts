import { Injectable } from '@angular/core';
import { HouseService } from './house.service';
import { UserService } from './user.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  messages;
  DB;

  currentHouse;
  currentUser;

  constructor(private afs: AngularFirestore,
              private houseService: HouseService,
              private userService: UserService) { 

    this.currentUser = this.userService.getUser();
    //Get house, then get forum collection of that house - set to DB
    //or set this collection to the messages array you have made
    }

    //this function gets the id from the URL, and sets the currentHouse. This needs to be called on the start of the forum page
    setCurrentHouse(id: string){
      return this.currentHouse = this.houseService.getHouse(id);
    }

}
