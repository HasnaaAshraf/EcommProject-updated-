import { Component } from '@angular/core';
import { ProductsService } from '../../../shared/services/products.service';
import { Product } from '../../../shared/interfaces/product';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../shared/services/cart/cart.service';




@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  constructor(private _ProductsService:ProductsService, private _CartService:CartService){}

  errorMess : string = ''

  allProducts:Product[] = []


  ngOnInit(): void {


    this._ProductsService.getAllProductsAPI().subscribe({
      next:(res)=>{
      this.allProducts = res.data
      }, 

      error:(err)=>{
        this.errorMess = err.error.message
      }
       
    })

   
    
    if(typeof localStorage !== 'undefined')
    {
      localStorage.setItem("currentPage" , '/products')
    }
    
  }

}
