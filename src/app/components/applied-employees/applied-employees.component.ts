import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../services/AppliedEmployeeService/applied-employee.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-applied-employees',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './applied-employees.component.html',
  styleUrl: './applied-employees.component.scss'
})
export class AppliedEmployeesComponent implements OnInit {
  employees: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    const openingId = this.route.snapshot.paramMap.get('id');
    if (openingId) {
      this.employeeService.getAppliedEmployees(openingId).subscribe(data => {
        this.employees = this.filterUniqueEmployees(data);
      });
    }
  }

  filterUniqueEmployees(applications: any[]): any[] {
    const seen = new Set();
    return applications.filter(application => {
      const isDuplicate = seen.has(application.empId);
      seen.add(application.empId);
      return !isDuplicate;
    });
  }

}