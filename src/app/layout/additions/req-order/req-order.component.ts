import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrdersService } from '../../../shared/services/orders/orders.service';



@Component({
  selector: 'app-req-order',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './req-order.component.html',
  styleUrl: './req-order.component.scss'
})
export class ReqOrderComponent {

  constructor(private _OrdersService:OrdersService,private _ActivatedRoute:ActivatedRoute){}

  myDataForm : FormGroup = new FormGroup({
    details : new FormControl (null ,[Validators.required]),
    phone : new FormControl (null ,[Validators.required]),
    city : new FormControl (null ,[Validators.required]),
  })

  checkOut(){
    this._ActivatedRoute.paramMap.subscribe((p)=>{
      this._OrdersService.reqOrder( p.get('cartId')!,this.myDataForm.value).subscribe((res)=>{
        
        
       window.open(res.session.url,'_self')  


      })
    })
  }
}
