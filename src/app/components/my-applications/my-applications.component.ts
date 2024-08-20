import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-applications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-applications.component.html',
  styleUrl: './my-applications.component.scss'
})
export class MyApplicationsComponent implements OnInit {
  applications: any[] = [];

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    const employeeInfo = this.authService.getEmployeeInfo();
    console.log(employeeInfo.empID);
    
    if (employeeInfo.empID===null) {
      console.log("11");
      
      this.router.navigate(['/login']);
      return;
    }

    this.http.get<any[]>(`http://localhost:8090/api/applications/employee/${employeeInfo.empID}`)
      .subscribe(data => {
        console.log(data);
        
        this.applications = data;
      });
  }

  viewOpeningDetails(openingId: number): void {
    this.router.navigate([`/opening/${openingId}`]);
  }
}
