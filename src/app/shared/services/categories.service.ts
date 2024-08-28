import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../../Base/Environment';



@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _HttpClient:HttpClient ) { }

  allCategories():Observable<any>
  {
    return this._HttpClient.get(`${Environment.baseURL}/api/v1/categories`)
  }

  getSpecificCategory(CId:string):Observable<any>
  {
    return this._HttpClient.get(`${Environment.baseURL}/api/v1/categories/${CId}`)
  }
}
