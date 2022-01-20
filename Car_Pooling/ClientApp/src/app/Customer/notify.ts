import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class UserGlobalService {

  public static notifylist;
  constructor() { }
}
