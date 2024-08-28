import { Component } from '@angular/core';
import { ProductsService } from '../../../shared/services/products.service';
import { concatMap, delay, distinct, distinctUntilChanged, from, interval, map, mergeAll, mergeMap, Observable, of, Subject, takeUntil, timer } from 'rxjs';
import { error } from 'console';
import { BrandsService } from '../../../shared/services/brands/brands.service';
import { Brands } from '../../../shared/interfaces/Brands';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';



@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [ CarouselModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent {

  sliderImages:string[]=["../../../../assets/images/5875124707123118446.jpg",
    "../../../../assets/images/5875124707123118447.jpg"
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

  constructor( private _ProductsService:ProductsService, private _BrandsService:BrandsService){}

   errorMess : string = ''

   brands : Brands[] = []

  //make Observable :

  //old way:
  // x = new Observable (function (observ) {

  //   observ.next('lolo'),
  //   observ.next('koko'),
  //   observ.next('solo'),
  //   observ.next('eolo'),

  //   // في حاله انه لقي ايرور دي هيناديها ومش هيشوف ال complete
  //   observ.error('Error found'),
  //   observ.complete()
   
  // })

  //Types help observable :
  // 1 --> from :
  
  // x = from(['loka','fota','bota'])  // make to everyone next 

  // 2 --> of :

  // x = of('loka', 334 ,'bota' , {name : 'haso' , age : 55})

  //interval :

  //  x = interval(1000)    //take on duration 

  // timer :
  //          1   2                   2                     1                                
  // x = timer(2000,1000)     //هيقعد قد ايه ويظهر  , هيظهرهك كل قد ايه 

  //unigue Data :

  // x = of('1','2','3','4','4','5','5','1','6','2')


  // url = of('http://loremflickr.com/500/500')

  // categories = of( 
  //   {name : 'cairo',del:1000},
  //   {name : 'dokii',del:0},
  //   {name : 'paris',del:500},
  //   {name : 'helwan',del:2000},
  //   {name : 'london',del:4000}
  // )

  // destroy = new Subject()

  // x = interval(1000)


  ngOnInit(): void {


    this._BrandsService.AllBrands().subscribe({
      next:(res)=>{
        this.brands = res.data
        console.log(res.data); 
      },

      error :(err)=>{
        this.errorMess = err.error.message
      }
    })


   
  // this.x.pipe(

  //   takeUntil(this.destroy)


  // ).subscribe(
  //   {next:(res)=>{console.log(res);
  //   }}
  // )

    // this._ProductsService.getAllProductsAPI().pipe(

    //   //Edit Data from API:
    //    map((res)=>{

    //     //map here properity of array :
    //     res.data = res.data.map((produc:any)=>{
    //       produc.price = produc.price * 10

    //       return produc
    //     })

    //    return res
    //    })

    // ).subscribe({next:(res)=>{console.log(res)}})


    if(typeof localStorage !== 'undefined')
    {
      localStorage.setItem("currentPage" , '/brands')
    }


    // RXJS Practice :

    // this._ProductsService.getAllProductsAPI().pipe(

    //   map((resPosts)=>{

    //     return this._ProductsService.getAllUsersAPI().pipe(

    //       map((resUsers)=>{

    //         return [ ...resPosts , ...resUsers ]

    //       })


    //     )
    //   }) ,mergeAll()

    // ).subscribe({
  
    //   next : (res)=>{console.log(res)},

    //   error : (err)=>{console.log(err)},

    //   complete : ()=>{console.log("Done")}
  
    //   })


     // this.x.pipe(
    // distinctUntilChanged()

    // ).subscribe({
  
    //   next : (res)=>{console.log(res)},

    //   error : (err)=>{console.log(err)},

    //   complete : ()=>{console.log("Done")}
  
    //   })

  //////

    // this.categories.pipe(
    //   concatMap((cat)=>{
    //     return this.url.pipe(
    //       delay(cat.del),
    //       map((url)=>{
    //         return url + '/' + cat.name
    //       })
    //     )
    //   })
    // ).subscribe(
    //   {next:(res)=>{console.log(res)}}
    // )

  /////


  /////
    
  } 


  ngOnDestroy(): void {
  //  this.destroy.next('finish') 
  }

}
