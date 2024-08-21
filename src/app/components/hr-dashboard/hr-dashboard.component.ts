import { Component, OnInit } from '@angular/core';
import { OpeningService } from '../../services/OpeningService/opening.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ApplicationServiceService } from '../../services/ApplicationsService/application-service.service';
@Component({
  selector: 'app-hr-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hr-dashboard.component.html',
  styleUrl: './hr-dashboard.component.scss'
})
export class HrDashboardComponent implements OnInit {

  appliedEmployees: any[] = [];

  constructor(
    private applicationService: ApplicationServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadAppliedEmployees(id);
  }

  loadAppliedEmployees(id:number): void {
    console.log("id on hr-dashboard is",id);
    this.applicationService.getApplicationByOpeningID(id)
      .subscribe(data => {
        this.appliedEmployees = data;
      });
  }
}