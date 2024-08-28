import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';



@Injectable({
  providedIn: 'root'
})
export class MyTranslateService {

  constructor(private _TranslateService:TranslateService, @Inject(PLATFORM_ID) private platformId:object) { 

    _TranslateService.setDefaultLang('en')

    if(isPlatformBrowser(platformId)){

      this.setLang()
  
    }

    }

    setLang(){

      if(localStorage.getItem('lang') != null)
        {

          let userLang = localStorage.getItem('lang')!
  
          //Words:
          this._TranslateService.use(userLang);
      
          //dir:
          if(userLang == 'en'){
            document.body.dir = 'ltr'
          }
          else if(userLang == 'ar'){
            document.body.dir = 'rtl'
          }

        }
      
    }

    changLang(lang:string){

      localStorage.setItem('lang' , lang)

      this.setLang()
    }

}
