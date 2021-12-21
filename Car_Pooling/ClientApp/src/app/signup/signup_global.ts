import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class Global {

  public static personaldata:any;
  public static vehicledata:any;
  public static habits :any;
  constructor() { }
}