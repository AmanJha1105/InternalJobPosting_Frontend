import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllApplicationService } from '../../services/AllApplicationService/all-application.service';

@Component({
  selector: 'app-all-applications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-applications.component.html',
  styleUrl: './all-applications.component.scss'
})
export class AllApplicationsComponent implements OnInit {
  applications: any[] = [];

  constructor(
    private applicationService: AllApplicationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.applicationService.getAllApplications().subscribe(data => {
      console.log(data);
      
      this.applications = this.groupByOpeningId(data);
    });
  }

  groupByOpeningId(applications: any[]): any[] {
    const grouped = applications.reduce((acc, curr) => {
      const openingId = curr.openingId;
      if (!acc[openingId]) {
        acc[openingId] = {
          openingTitle: curr.openingTitle,
          applications: []
        };
      }
      acc[openingId].applications.push(curr);
      return acc;
    }, {});

    return Object.values(grouped);
  }

  viewOpening(openingId: number): void {
    this.router.navigate([`/opening/${openingId}`]);
  }
}