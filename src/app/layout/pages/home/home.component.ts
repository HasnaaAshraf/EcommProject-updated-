import { Component } from '@angular/core';
import { ProductsService } from '../../../shared/services/products.service';
import { Product } from '../../../shared/interfaces/product';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { categories } from '../../../shared/interfaces/categories';
import { CategoriesService } from '../../../shared/services/categories.service';
import { FormsModule, NgModel } from '@angular/forms';
import { SearchPipe } from '../../../shared/pipes/search/search.pipe';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink , CarouselModule ,TranslateModule,FormsModule,SearchPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {

  sliderImages:string[]=["assets/images/slider-image-1.jpeg",
    "assets/images/slider-image-2.jpeg",
    "assets/images/slider-image-3.jpeg"
  ]

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    rtl : true ,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  }


  allProducts:Product[] = []

  searchName:string = ''

  constructor( private _TranslateService:TranslateService , private _ToastrService:ToastrService, private _ProductsService:ProductsService , private _CartService:CartService,private _CategoriesService:CategoriesService){}

  errorMess : string = ''

  categories : categories[] = []

   //For Carsoul Categories:
   customoptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    rtl : true ,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 7
      }
    },
    nav: true
  }

  ngOnInit(): void {

    if(typeof localStorage !== 'undefined'){

      localStorage.setItem('currentPage' , "home")
    }

    this._ProductsService.getAllProductsAPI().subscribe({
      next:(res)=>{
       this.allProducts = res.data ;
        
      },
      error:(err)=>{
      this.errorMess = err.error.message 
      }
    })

    this._CategoriesService.allCategories().subscribe({
      next:(res)=>{
        console.log(res);
       this.categories = res.data ;
        
      },
      error:(err)=>{
      this.errorMess = err.error.message 
      }
    })
  
    this._ProductsService.getAllProductsAPI().subscribe((res)=>{
      console.log(res);  
    })
  
  }

  addToCartbtn(pId:string)
  { 
    this._CartService.addToCartAPI(pId).subscribe((res)=>{
    this._ToastrService.success(res.message)
    })
  }


  // problems occurs in constructor and component l.s:

  // constructor(@Inject(PLATFORM_ID) private x : object ){
  //   console.log("const : run in server and browser ");

  //   //second solution :
  //   afterNextRender(()=>{
  //     console.log(document.title);
  //   })

  //   //third solution(platformID):
  //   if (isPlatformServer (x)) {
  //     console.log("hiiii");
  //   }

  // }


  // // ngOnInit(): void {
  // //   console.log("oninit : run in server and browser ");
  // //   // first solution (if (typeof))
  // //   if(typeof window !== 'undefined'){
  // //     console.log(window);
  // //   }
  // // }

  // // // in normal method there is no problems 
  // // test(){
  // //   console.log("okkkkk");
  // //   console.log(document.title);
  // // }


}



//   ngOnInit(): void {
    
//     if(typeof localStorage !== 'undefined')
//     {
//       localStorage.setItem("currentPage" , '/home')
//     }


//     this._ProductsService.getAllProductsAPI().subscribe({
//       next : (res) =>{
//         this.allProducts = res.data
//         console.log(res.data)
//       }
//     })

//   }

//   addToCart(pId:string)
//   { 
//     this._CartService.addToCartAPI(pId).subscribe((res)=>{
//     this._ToastrService.success(res.message)
//     })
//   }
// }


