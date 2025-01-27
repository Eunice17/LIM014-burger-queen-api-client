import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private route: Router) { }

  canActivate() {
    try {
      const local: any = this.authService.getToken();
      const token: any = jwt_decode(local);
      if (!token.roles.admin) {
        this.route.navigate(['login']);
        return false;
      }

    } catch (error) {
      this.route.navigate(['login']);
    }
    return true;
  }

}
