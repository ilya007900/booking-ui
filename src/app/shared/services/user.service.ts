import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _userEmail: string = '';

  constructor() { }

  set userEmail(userEmail: string) {
    this._userEmail = userEmail;
  }

  get userEmail(): string {
    return this._userEmail;
  }
}
