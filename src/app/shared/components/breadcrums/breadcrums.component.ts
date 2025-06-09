import { Component, Input } from '@angular/core';
import { BreadcrumbItem } from './breadcrumbItem.model';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-breadcrums',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrums.component.html',
  styleUrl: './breadcrums.component.scss',
})
export class BreadcrumsComponent {
  constructor(private readonly router: Router) {}
  @Input() breadcrumbItems: BreadcrumbItem[] = [];
  @Input() forceRedirect: boolean = false;
  redirect(route: string) {
    if (this.forceRedirect) {
      window.location.href = route;
    } else {
      this.router.navigate([route]);
    }
  }
}
