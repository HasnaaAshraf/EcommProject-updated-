import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, RouterModule, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { provideToastr,ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { headerInterceptor } from './shared/interceptor/header.interceptor';
import { errorsInterceptor } from './shared/interceptor/errors.interceptor';
import { spinnerLoadingInterceptor } from './shared/interceptor/spinner-loading.interceptor';


function HttpLoaderFactory(http:HttpClient)
{
  return new TranslateHttpLoader(http , './assets/i18n/' , '.json' )
}


export const appConfig: ApplicationConfig = {
  providers: [   provideHttpClient(  withFetch(), withInterceptors([headerInterceptor,errorsInterceptor,spinnerLoadingInterceptor]) ) , provideAnimations(),provideToastr(),  provideRouter(routes , withViewTransitions()), provideClientHydration() , importProvidersFrom(HttpClientModule , RouterModule , BrowserAnimationsModule  , NgxSpinnerModule  ,

    TranslateModule.forRoot({
      loader :{
        provide : TranslateLoader ,
        useFactory : HttpLoaderFactory,
        deps : [HttpClient]
      }
    })

)]
};
