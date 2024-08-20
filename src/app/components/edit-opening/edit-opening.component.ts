import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OpeningService } from '../../services/OpeningService/opening.service';
import { Opening } from '../opening/opening.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-opening',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './edit-opening.component.html',
  styleUrls: ['./edit-opening.component.scss']
})
export class EditOpeningComponent implements OnInit {
  editForm: FormGroup;
  openingId: any;

  constructor(
    private fb: FormBuilder,
    private openingService: OpeningService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      lastDateToApply: ['', Validators.required],
      skills: ['', Validators.required],
      salary: ['', Validators.required],
      experience: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.openingId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadOpening();
  }

  loadOpening() {
    this.openingService.getOpeningById(this.openingId).subscribe(opening => {
      this.editForm.patchValue(opening);
    });
  }

  onSubmit() {
    if (this.editForm.valid) {
      const updatedOpening: Opening = this.editForm.value;
      this.openingService.updateOpening(this.openingId, updatedOpening).subscribe({
        next: () => {
          this.router.navigate(['/openings']);
        },
        error: err => {
          console.error('Failed to update the opening:', err);
          alert('Failed to update the opening. Please try again later.');
        }
      });
    }
  }
}