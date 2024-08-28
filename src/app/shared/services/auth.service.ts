import { HttpClient } from '@angular/common/http';
import { afterNextRender, Injectable } from '@angular/core';

import {login, Register} from '../interfaces/register'
import { Environment } from '../../Base/Environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData : BehaviorSubject<any> = new BehaviorSubject(null)


  // Refresh
  constructor( private _HttpClient:HttpClient , private _Router:Router  ) {

  
      if(typeof localStorage !== 'undefined')
      {
        if(localStorage.getItem("userToken") != null)
          {
      
            this.userInform()
           
            this._Router.navigate([localStorage.getItem("currentPage")])
          }
      }
  
   
   }


  sendRegister(data:Register):Observable<any>
  {
    return this._HttpClient.post(`${Environment.baseURL}/api/v1/auth/signup` , data  )
  }

  sendLogin(data:login):Observable<any>
  {
    return this._HttpClient.post(`${Environment.baseURL}/api/v1/auth/signin` , data  )
  }

  userInform()
  {
    
    this.userData.next(jwtDecode(  JSON.stringify(localStorage.getItem("userToken")) ));

  }

  // ================= forget =======================

  sendVerifyAPI(data:any):Observable<any>
  {
    return this._HttpClient.post(`${Environment.baseURL}/api/v1/auth/forgotPasswords` , data)
  }

  sendCodeAPI(data:any):Observable<any>
  {
    return this._HttpClient.post(`${Environment.baseURL}/api/v1/auth/verifyResetCode` , data)
  }
  sendNewPasswordAPI(data:any):Observable<any>
  {
    return this._HttpClient.put(`${Environment.baseURL}/api/v1/auth/resetPassword` , data)
  }
}
