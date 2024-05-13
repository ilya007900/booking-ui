import { formatDate } from "@angular/common";

export class DatesRange {
    private _start: Date | null;
    private _end: Date | null;
  
    get start(): string {
      return this.format(this._start);
    }
  
    get end(): string {
      return this.format(this._end);
    }
  
    get minStart(): string {
      return this.addDaysAndFormat(this.today, 1);
    }
  
    get minEnd(): string {
      if (this._start != null) {
        return this.addDaysAndFormat(this._start, 1);
      }
  
      return this.addDaysAndFormat(this.today, 2);
    }
  
    constructor(start: string, ebd: string, private readonly today: Date) {
      this._start = this.parseDate(start);
      this._end = this.parseDate(ebd);
  
      if (this._start == null || this._end == null || this._start >= this._end || this._start <= today) {
        this._start = null;
        this._end = null;
      }
    }
  
    updateStart(start: string): void {
      this._start = this.parseDate(start);
  
      if (this._start == null) {
        return;
      }
  
      if (this._end == null) {
        return;
      }
  
      if (this._start >= this._end) {
        this._end = null;
      }
    }
  
    updateEnd(end: string): void {
      this._end = this.parseDate(end);
  
      if (this._end == null) {
        return;
      }
  
      if (this._start == null) {
        return;
      }
  
      if (this._end <= this._start) {
        this._start = null;
      }
    }
  
    private format(date: Date | null): string {
      if (date == null) {
        return '';
      }
  
      return formatDate(date, 'yyyy-MM-dd', 'en');
    }
  
    private addDays(date: Date, days: number): Date {
      var newDate = new Date(date);
      newDate.setDate(date.getDate() + days)
      return newDate;
    }
  
    private addDaysAndFormat(date: Date, days: number): string {
      return this.format(this.addDays(date, days));
    }
  
    private parseDate(value: string): Date | null {
      const unix = Date.parse(value);
      if (isNaN(unix)) {
        return null;
      }
  
      return new Date(unix);
    }
  }