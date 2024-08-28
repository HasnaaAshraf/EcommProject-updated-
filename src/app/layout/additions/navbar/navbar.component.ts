import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { MyTranslateService } from '../../../shared/services/myTranslate/my-translate.service';




@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink , RouterLinkActive , TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  isLogin : boolean = false;

  constructor( private _AuthService:AuthService , private _Router:Router , private _MyTranslateService:MyTranslateService ){}


  // 1
  ngOnInit(): void {
    
  
    this._AuthService.userData.subscribe(()=>{

      if(  this._AuthService.userData.getValue() == null )
      {
        this.isLogin = false
      }
      else
      {
        this.isLogin = true
      }

    })

    
  }

  logout()
  {
    localStorage.removeItem("userToken");
    this._AuthService.userData.next(null);
    this._Router.navigate(['/login'])

  }


  // ar and En
  changLang(lang:string)
  {
    this._MyTranslateService.changLang(lang)

  }

}
