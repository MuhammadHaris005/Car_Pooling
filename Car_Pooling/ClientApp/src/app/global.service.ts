import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class GlobalService {

  public static PhoneNo:any;
  public static role:any;
  constructor() { }
}
