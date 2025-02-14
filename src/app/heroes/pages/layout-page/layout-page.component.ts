import { Component } from '@angular/core';
import { SideBarInterface } from '../../interfaces/side-bar.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-page',
  standalone: false,
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css'
})
export class LayoutPageComponent {

  public sideBarItems : SideBarInterface[] = [
    {label : 'List', icon: 'label', url: './list'},
    {label : 'Add', icon: 'add', url: './new-hero'},
    {label : 'Search', icon: 'search', url: './search'},
  ]
  constructor(private authService : AuthService, private router : Router){

  }
  public onLogout() : void{
    this.authService.logout();
    this.router.navigate(["/auth/login"]);
  }
  public getCurrentUser() : User | undefined{
    if(!this.authService.getCurrentUser()){
      return {
        id : 0,
        user: 'No user',
        email: 'No email',
      }
    }
    const currentUser = this.authService.getCurrentUser() as User;
    return currentUser;
  }
}
