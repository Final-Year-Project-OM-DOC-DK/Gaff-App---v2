import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';
import { currentId } from 'async_hooks';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})



export class ProfilePage implements OnInit {
  constructor(private userService: UserService) { }

  currentUser;

  ngOnInit() {
    //set currentUser var to User from service.
    this.currentUser = this.userService.getUser();
    console.log(this.currentUser)
  }


}
