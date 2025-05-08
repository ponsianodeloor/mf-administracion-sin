import { Component, Input } from '@angular/core';
import { BreadcrumbItem } from '../../../core/models/util/breadcrumbItem';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-breadcrums',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrums.component.html',
  styleUrl: './breadcrums.component.scss'
})
export class BreadcrumsComponent {
  @Input() breadcrumbItems: BreadcrumbItem[] = [];
}
