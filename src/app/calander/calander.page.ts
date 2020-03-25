import { Component, ViewChild, OnInit, DebugElement } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { House, HouseService, calendarEvent } from '../Services/house.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-calander',
  templateUrl: './calander.page.html',
  styleUrls: ['./calander.page.scss'],
})

export class CalanderPage implements OnInit {
  //sets minimum date that can be used - eg: now, today
  minDate = new Date().toISOString();

  //source of stored events
  eventSource: Observable<calendarEvent[]>;
  test: [];

  //both are being populated OnInit
  currentHouse : House;
  currentHouseId : string;

  //define elements of calendar object
  callendarEvent: calendarEvent = {
        title: '',
        description: '',
        startTime: new Date(),
        endTime: new Date(),
        allDay: false
  };


  //describes the mode (view) and sets to current date (today)
  calendar = {
    mode: 'month',
    currentDate: new Date()
  }

  viewTitle = '';


  //static set to false, so that component ALWAYS gets initialized after the view initialization
  @ViewChild(CalendarComponent, {static:true}) myCal: CalendarComponent;

  constructor(private activatedRoute: ActivatedRoute,
              private route : Router,
              private houseService: HouseService,
              ) {
  }

  ngOnInit(){
    //call on initialising to give clear event inputs
    this.resetEvent();
    //this.myCal.loadEvents();

    //this disects the url to give me the ID needed to get the house object
    let id1 = this.route.url.split('id=');
    let id2 = id1[1].toString();
    let id3 = id2.split('/');
    let id = id3[0].toString();

    //gets house object through id and sets it to 'currentHouse'. Sets current house id outside of this function.
    this.houseService.getHouse(id);
    if (id){
      this.houseService.getHouse(id).subscribe(house => {
      this.currentHouse = house;
      this.currentHouseId = id;
      });
      //adds calendar events for this house to variable eventSource
    this.eventSource = this.houseService.getAllCalendarEvents(id);

    //attempt to use for each to add to test array, so it is compatible with calendar
    this.eventSource.forEach(function (calendarEvent){
      console.log(calendarEvent);
      //this.test.push(calendarEvent);
    })
    }
  }

  loadEvents(){
    if(this.eventSource){
      this.myCal.loadEvents();
      console.log("loaded events");
    }
    else{
      console.log("eventSource was empty");
    }
  }

  //once event is submitted, all values are reset, times are set to current time
  resetEvent(){
    this.callendarEvent = {
      title: '',
      description: '',
      startTime: new Date(),
      endTime: new Date(),
      allDay: false
    };
  }

  changeMode(mode){
    this.calendar.mode = mode;
  }
  back(){
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }
  next(){
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }

  addEvent(){
    //using copy in order to prevent blips in data input
    let eventCopy = {
    title: this.callendarEvent.title,
    description: this.callendarEvent.description,
    startTime: new Date (this.callendarEvent.startTime),
    endTime: new Date (this.callendarEvent.endTime),
    allDay: this.callendarEvent.allDay
    }
    //if all day is selected, this function sets the event to run all day
    if (eventCopy.allDay) {
      let start = eventCopy.startTime;
      let end = eventCopy.endTime;
 
      eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
      eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
    }

    eventCopy = this.callendarEvent;
    this.houseService.addToCalendar(this.callendarEvent, this.currentHouseId);
    //reload calendar
    this.myCal.loadEvents();
    //reset fields on add event
    this.resetEvent();
  }

  today(){
    this.calendar.currentDate = new Date();
  }

  onEventSelected(){
  
  }
  onViewTitleChanged(title){
    this.viewTitle = title;
  }
  onTimeSelected(ev){
    let selected = new Date(ev.selectedTime);
    this.callendarEvent.startTime = selected;
    selected.setHours(selected.getHours() + 1);
    this.callendarEvent.endTime = selected;
  }


}
