import { Component } from '@angular/core';
import { SideBarInterface } from '../../interfaces/side-bar.interface';

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

}
