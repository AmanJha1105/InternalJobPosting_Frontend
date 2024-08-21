import { Component, OnInit } from '@angular/core';
import { Opening } from '../opening/opening.model';
import { Employee } from './Employee.model';
import { OpeningService } from '../../services/OpeningService/opening.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApplyServiceService } from '../../services/ApplyService/apply-service.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-opening-detail',
  standalone: true,
  imports: [CommonModule,MatSnackBarModule],
  templateUrl: './opening-detail.component.html',
  styleUrl: './opening-detail.component.scss'
})
export class OpeningDetailComponent implements OnInit {
  opening: Opening | null = null;
  employeeId: number|null = null;
  router: any;

  constructor(private route: ActivatedRoute
    , private openingService: OpeningService,
    private applicationService: ApplyServiceService,
    private snackBar : MatSnackBar,
    private authService : AuthService
  ) {}

  ngOnInit(): void {
    const employeeInfo = this.authService.getEmployeeInfo();
    this.employeeId = employeeInfo?.empID || null; 
    console.log("employeeId on ngInit is", this.employeeId);
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.openingService.getOpeningById(id).subscribe(data => {
      this.opening = data;
    });
    
  }
  viewAppliedEmployees() {
    if (this.opening && this.opening.openingId) {
      this.router.navigate(['/applied-employees', this.opening.openingId]);
    }
  }
  apply(employeeId: number | null | undefined, openingId: number | null | undefined): void {
    console.log("e is" ,employeeId);
    console.log("o is " ,openingId);
    if (employeeId == null || openingId == null) {
      this.snackBar.open('Failed to apply. Employee or Opening information is missing.', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
      return;
    }
  
    this.applicationService.apply(employeeId, openingId).subscribe({
      next: (response: string) => {
        let message = 'Successfully applied!';
        
        if (typeof response === 'string') {
          message = response;
        }
    
        this.snackBar.open(message, 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      },
      error: err => {
        console.error('Error applying:', err);
        this.snackBar.open('Failed to apply. Please try again.', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      }
    });
  }
}

