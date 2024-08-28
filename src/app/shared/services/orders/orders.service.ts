import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../Base/Environment';
import { Observable } from 'rxjs';

HttpClient

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  userToken : any = {token : localStorage.getItem('userToken')}

  constructor(private _HttpClient:HttpClient) { }

  reqOrder(cId:string,formData :any):Observable<any>
  {
    return this._HttpClient.post(`${Environment.baseURL}/api/v1/orders/checkout-session/${cId}?url=http://localhost:4200`,
      {shippingAddress:formData} )
  }
}
