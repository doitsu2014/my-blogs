import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  standalone: true,
  selector: 'dtech-navbar',
  templateUrl: './navbar.component.html',
  imports: [SvgIconComponent],
})
export class NavbarComponent implements OnInit, AfterViewInit {
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}
}
