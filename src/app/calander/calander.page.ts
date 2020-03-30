import { Component, ViewChild, OnInit } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { House, HouseService, calendarEvent } from '../Services/house.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CalendarService } from '../Services/calendar.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-calander',
  templateUrl: './calander.page.html',
  styleUrls: ['./calander.page.scss'],
})

export class CalanderPage implements OnInit {
  //define elements of calendar object
  callendarEvent = {
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    allDay: false
  };

  //sets minimum date that can be used - eg: now, today
  minDate = new Date().toISOString();

  //source of stored events
  eventSource = [];
  test = [];
  viewTitle;

  //describes the mode (view) and sets to current date (today)
  calendar = {
    mode: 'month',
    currentDate: new Date(),
  }

  //both are being populated OnInit
  currentHouse: House;
  currentHouseId: string;


  //static set to false, so that component ALWAYS gets initialized after the view initialization
  @ViewChild(CalendarComponent, { static: true }) myCal: CalendarComponent;

  constructor(private activatedRoute: ActivatedRoute,
    private route: Router,
    private houseService: HouseService,
    private calendarService: CalendarService,
    private afs: AngularFirestore) { }

  ngOnInit() {
    //call on initialising to give clear event inputs
    this.resetEvent();
    //do this after you set the collection to eventSource array
    //this.myCal.loadEvents();
    //this disects the url to give me the ID needed to get the house object
    let id1 = this.route.url.split('id=');
    let id2 = id1[1].toString();
    let id3 = id2.split('/');
    let id = id3[0].toString();

    //gets house object through id and sets it to 'currentHouse'. Sets current house id outside of this function.
    this.houseService.getHouse(id);
    if (id) {
      this.houseService.getHouse(id).subscribe(house => {
        this.currentHouse = house;
        this.currentHouseId = id;
        this.loadCalenderEvents();
      });
      //adds calendar events for this house to variable eventSource
      // this.eventSource = this.calendarService.getAllCalendarEvents(id);

      //attempt to use for each to add to test array, so it is compatible with calendar
      //this.eventSource.forEach(function (calendarEvent) {
        //console.log(calendarEvent);
        //this.test.push(calendarEvent);
     // });
    }
    //get calendar collection from db and set to variable
  }

  loadEvents() {
    if (this.eventSource) {
      this.myCal.loadEvents();
      console.log("loaded events");
    }
    else {
      console.log("eventSource was empty");
    }
  }

  //once event is submitted, all values are reset, times are set to current time
  resetEvent() {
    this.callendarEvent = {
      title: '',
      description: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false
    };
  }

  changeMode(mode) {
    this.calendar.mode = mode;
  }
  back() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }
  next() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }







  addEvent() {
    //using copy in order to prevent blips in data input
    let eventCopy = {
      title: this.callendarEvent.title,
      description: this.callendarEvent.description,
      startTime: new Date(this.callendarEvent.startTime),
      endTime: new Date(this.callendarEvent.endTime),
      allDay: this.callendarEvent.allDay
    }
    //if all day is selected, this function sets the event to run all day
    if (eventCopy.allDay) {
      let start = eventCopy.startTime;
      let end = eventCopy.endTime;
      eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
      eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
    }
    //push event to event source array
    //  this.eventSource.push(eventCopy);
    //
    //add event to FB collection - working
    this.calendarService.updateCalendarCollection(eventCopy, this.currentHouseId);
    //reload calendar
    this.myCal.loadEvents();
    //reset fields on add event
    this.resetEvent();
  }




  //load calendar events from FB
  //map to evenSource[]
  loadCalenderEvents(){
    let calendarCollection = this.calendarService.getAllCalendarEvents(this.currentHouseId);
    calendarCollection.forEach(events => {
      this.eventSource.push(events);
    });
    console.log(this.eventSource);
    
    this.eventSource[0].forEach(element => {
      this.test.push(element);
    });
    console.log(this.test);
  }














  today() {
    this.calendar.currentDate = new Date();
  }

  onEventSelected() {

  }
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
  onTimeSelected(ev) {
    let selected = new Date(ev.selectedTime);
    this.callendarEvent.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.callendarEvent.endTime = selected.toISOString();
  }


}
