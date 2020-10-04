import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import * as _moment from 'moment';

import { default as _rollupMoment } from 'moment';
import { LookupService } from '../lookup.service';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

/** @title Datepicker with custom formats */
@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class DatePickerComponent {

  constructor(private lookupService: LookupService) {
    // datePicked is the selected date which is comming through service class. If it is null then by default proceed through current date.
    if (!lookupService.datePicked)
      lookupService.datePicked = new Date().toDateString();
  }
  //min date to disabl the past date
  minDate = new Date();
  date = new FormControl(moment());
  inputEvent(event) {
    //convert into event into 1 Jan 2020
    let dateArray = event.value.toString().split(" ");
    let date: string = dateArray[1] + " " + dateArray[2] + " " + dateArray[3];
    console.log(date);
    // set the selected date into service class.
    this.lookupService.datePicked = date;

  }

}
