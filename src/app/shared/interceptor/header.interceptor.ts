import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {


  //this place to edit something before to go in Req :

  if(typeof localStorage !== 'undefined')
    {
      if(localStorage.getItem('userToken') !== null)
      {
        let userToken : any = {token : localStorage.getItem("userToken")}
  
      req = req.clone({
        setHeaders  : userToken 
      })
      }
  
    }

  return next(req);
};


