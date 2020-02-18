import { Component, ViewChild, OnInit } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar/calendar';

@Component({
  selector: 'app-calander',
  templateUrl: './calander.page.html',
  styleUrls: ['./calander.page.scss'],
})
export class CalanderPage implements OnInit {

  //layout for different elements of an event
  event = {
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    allDay: false
  };

  minDate = new Date().toISOString();

  eventSource = [];

  //describes the mode (view) and sets to current date (today)
  calendar = {
    mode: 'month',
    currentDate: new Date()
  }

  viewTitle = '';

  //static set to false, so that component ALWAYS gets initialized after the view initialization
  @ViewChild(CalendarComponent, {static:false}) myCal: CalendarComponent;

  constructor() {}

  ngOnInit(){
    //call on initialising to give clear event inputs
    this.resetEvent();
  }

  //once event is submitted, all values are reset, times are set to current time
  resetEvent(){
    this.event = {
      title: '',
      description: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false
    };
  }

  addEvent(){
    
  }

  onEventSelected(){

  }
  onViewTitleChanged(){

  }
  onTimeSelected(){

  }


}
