import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './@dtech/navbar/navbar.component';
import { FlowbiteService } from './services/flowbite.service';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, SvgIconComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'web-app';

  constructor() {}
  ngOnInit(): void {}
}
