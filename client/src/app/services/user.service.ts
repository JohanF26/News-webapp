import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Subject } from 'rxjs'

const apiUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  subject = new Subject();

  constructor(
    private http: HttpClient
  ) { }

  registerUser(data: any){
    return this.http.post(apiUrl+'/register', data)
  }

  login(data: any){
    return this.http.post(apiUrl+'/login', data)
  }

  logout() {
    localStorage.removeItem('userObj')
  }

  setUserObj(value: string){
    localStorage.setItem('userObj', value)
    this.subject.next(value)
  }

  getUserObj() {
    if(localStorage.getItem('userObj')){
      this.subject.next(localStorage.getItem('userObj'))
    }
    return this.subject.asObservable()
  }
  

}
