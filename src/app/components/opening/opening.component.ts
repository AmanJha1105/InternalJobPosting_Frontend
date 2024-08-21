import { Component, OnInit } from '@angular/core';
import { Opening } from './opening.model';
import { OpeningService } from '../../services/OpeningService/opening.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-opening',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './opening.component.html',
  styleUrl: './opening.component.scss'
})
export class OpeningComponent implements OnInit {
  openings: Opening[] = [];
  isAdmin: boolean = true;

  constructor(private openingService: OpeningService, private router: Router) {}

  ngOnInit(): void {
    this.checkUserRole();
    this.loadOpenings();
  }

  checkUserRole() {
    //const userRole = localStorage.getItem('userRole');
    //this.isAdmin = userRole === 'HR';
  }

  loadOpenings() {
    this.openingService.getOpenings().subscribe(data => {
      this.openings = data;
    });
  }

  navigateToMyApplications(): void {
    this.router.navigate(['/my-applications']);
  }

  viewOpening(id: number) {
    this.router.navigate([`/opening/${id}`]);
  }

  addOpening() {
    this.router.navigate(['openings/add']);
  }

  updateOpening(id:number){
    this.router.navigate([`openings/update/${id}`]);
  }

  deleteOpening(id: number) {
    if (confirm('Are you sure you want to delete this opening?')) {
      this.openingService.deleteOpening(id).subscribe({
        next: () => {
          this.openings = this.openings.filter(opening => opening.openingId !== id);
        },
        error: err => {
          console.error('Failed to delete the opening:', err);
          alert('Failed to delete the opening. Please try again later.');
        }
      });
    }
  }

  viewAllApplications(): void {
    this.router.navigate(['/all-applications']);
  }

}