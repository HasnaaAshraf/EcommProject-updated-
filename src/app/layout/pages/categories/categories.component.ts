import { Component } from '@angular/core';
import { CategoriesService } from '../../../shared/services/categories.service';
import { categories } from '../../../shared/interfaces/categories';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

  constructor(private _CategoriesService:CategoriesService){}

  categories : categories[] = []
  errorMess : string = ''

  ngOnInit(): void {


    this._CategoriesService.allCategories().subscribe({
      next:(res)=>{
      this.categories = res.data
      }, 

      error:(err)=>{
        this.errorMess = err.error.message
      }
       
    })


    
    if(typeof localStorage !== 'undefined')
    {
      localStorage.setItem("currentPage" , '/categories')
    }
    
  }

}
