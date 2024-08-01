import { Component } from '@angular/core';
import { Global } from '../../global';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Menu {
  path: string;
  icon: string;
  name: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  menu : Menu[];

  constructor(){
    this.menu = Global.MENU;
  }
}
