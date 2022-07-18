import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { RequestService } from './core/request.service';
import { LoginService } from './login/login-service.service';


interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Restaurant';
  isSideNavCollapsed = false;
  screenWidth = 0;
  loggedUser: any = {
    firstName: ' ',
    lastName: ' ',
    id: ' '
  };
constructor(private router: Router, private loginService: LoginService) {
}
  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
  isUserAuthenticated() {
    const token: any= localStorage.getItem("jwt");
    if(token){
      const tokenObject = this.decodeToken(token);
      this.loggedUser.firstName = tokenObject.firstname;
      this.loggedUser.lastName = tokenObject.lastname;
      this.loggedUser.id = tokenObject.id;
      return true;
    }
    else return false;
   

  }

  logOut() {
    localStorage.removeItem("jwt");
 
  }
  decodeToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }
}
