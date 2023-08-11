import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/shared-components/services/navigation.service';
import { NavigationItem } from 'src/shared-components/models/nav-item.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  navigationItems: NavigationItem[] = [];

  constructor(private navigationService: NavigationService) {}

  ngOnInit(): void {
    this.navigationService.navigationItems$.subscribe((items) => {
      this.navigationItems = items;
      console.log("in navbar", this.navigationItems)
    })
  }
}
