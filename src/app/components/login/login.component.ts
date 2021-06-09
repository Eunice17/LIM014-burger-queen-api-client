import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/model/user-interface';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  public user: UserInterface = {
    email: '',
    password: ''
  };
  error: boolean = false;
  errorMessage: string = 'Please enter a valid email or password'
  ngOnInit(): void { }

  login() {
    this.auth.requestPost(this.user.email, this.user.password)
      .subscribe(data => {
        this.auth.setToken(data.token);
        const token = this.auth.getToken();
        switch (token) {
          case '"tokenAdmin"':
            this.auth.authorization().subscribe(() => {
              if (this.auth.isLoggedIn) {
                this.router.navigate(['menuprincipal']);
              }
            })
            break;
          case '"tokenCocinero"':
            this.auth.authorization().subscribe(() => {
              if (this.auth.isLoggedIn) {
                this.router.navigate(['mainkitchener']);
              }
            })
            break;
          case '"tokenMesero"':
            this.auth.authorization().subscribe(() => {
              if (this.auth.isLoggedIn) {
                this.router.navigate(['mainWaiter']);
              }
            })
            break;
          default:
            console.log("No pasa nada");
        }
      }, error => {
        if (error.status === 400) {
          this.error = true;
        } else {
          alert("servidor desconectado");
        }
      });
  }
}

