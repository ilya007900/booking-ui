import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  notifySuccess(message: string): void {
    alert('succeess: ' + message);
  }

  notifyError(message: string): void {
    alert('error' + message);
  }
}
