import { Component } from '@angular/core';
import { TopbarComponent } from '../topbar/topbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component'
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MainViewComponent } from '../../main-view/main-view.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, TopbarComponent, SidebarComponent, RouterOutlet, MainViewComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {}
