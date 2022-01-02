import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class DriverGlobalService {

  public static routeID;
  constructor() { }
}
