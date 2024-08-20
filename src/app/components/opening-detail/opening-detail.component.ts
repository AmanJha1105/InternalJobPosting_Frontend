import { Component, OnInit } from '@angular/core';
import { Opening } from '../opening/opening.model';
import { Employee } from './Employee.model';
import { OpeningService } from '../../services/OpeningService/opening.service';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute
    , private openingService: OpeningService,
    private applicationService: ApplyServiceService,
    private snackBar : MatSnackBar,
    private authService : AuthService
  ) {}

  ngOnInit(): void {
    const storedEmployeeId = localStorage.getItem("EmpID");
    this.employeeId = storedEmployeeId ? Number(storedEmployeeId) : null;
    console.log("employeeid on nginit is" , this.employeeId);
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.openingService.getOpeningById(id).subscribe(data => {
      this.opening = data;
    });
    
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
      next: () => {
        this.snackBar.open('Successfully applied!', 'Close', {
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
