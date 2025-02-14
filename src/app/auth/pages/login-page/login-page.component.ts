import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: false,
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  constructor(private authService : AuthService, private router : Router){}

  public onLogin() : void{
    this.authService.login('john.due@gmail.com', '123456')
    .subscribe(users => {
      console.log('users', users);
      this.router.navigate(['/']);
    })
  }
}
