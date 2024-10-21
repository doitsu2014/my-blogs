import { Component, OnInit } from '@angular/core';
import { FlowbiteService } from '../../services/flowbite.service';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  standalone: true,
  selector: 'dtech-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  constructor(private flowbiteService: FlowbiteService) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      console.info('Flowbite loaded');
    });
  }
}
