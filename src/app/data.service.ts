import { Injectable } from '@angular/core';
import { HttpClient } from '../../node_modules/@angular/common/http';
import { Observable } from '../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  getUsers():Observable<Object>{
    return this.http.get('https://reqres.in/api/users')
  }

  helloWorld(){
    console.log("Hello World")
  }
}
