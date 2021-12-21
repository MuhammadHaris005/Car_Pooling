import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SignUpService {

  constructor(private http:HttpClient) { }

  PostMethod<T> (controllerName:any, controllerMethod:any,data: any){
    debugger;
    return this.http.post<any>("https://localhost:44358/"+controllerName+controllerMethod,data);
  }
  GetPointsMethod<T>(controllerName:any,controllerMethod:any,data:any){
    return this.http.post<any>("https://localhost:44358/"+controllerName+controllerMethod,data);
  }
  GetRides<T> (controllerName:any,controllerMethod:any){
    return this.http.get<any>("https://localhost:44358/"+controllerName+controllerMethod);
  }
  GetCaptainMethod<T> (controllerName:any, controllerMethod:any,data: any){
    return this.http.post<any>("https://localhost:44358/"+controllerName+controllerMethod,data);
  }
  BookingMethod<T> (controllerName:any, controllerMethod:any,data: any){
    debugger;
    return this.http.post<any>("https://localhost:44358/"+controllerName+controllerMethod,data);
  }
  UpdateStatus<T> (controllerName:any,controllerMethod:any,data:any){
    return this.http.post<any>("https://localhost:44358/"+controllerName+controllerMethod,data);
  }
}
