import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StoreService } from 'src/app/store.service';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-store-form',
  templateUrl: './store-form.component.html',
  styleUrls: ['./store-form.component.css']
})
export class StoreFormComponent implements OnInit {
  storeForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private storeService: StoreService,public apiService: ApiService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<StoreFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.storeForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone:['', Validators.required],
      email: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.data.mode === 'edit' && this.data.store) {
      this.storeForm.patchValue(this.data.store);
    }
  }

  onSubmit(): void {
    if (this.storeForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    const storeData = this.storeForm.value;

    if (this.data.mode === 'add') {
      this.storeService.createStore(storeData).subscribe({
        next: () => {
          this.dialogRef.close('success');
        },
        error: (err) => {
          console.error(err);
          this.snackBar.open('Failed to create store', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          this.isSubmitting = false;
        }
      });
    } else {
      this.storeService.updateStore(storeData).subscribe({
        next: () => {
          this.dialogRef.close('success');
        },
        error: (err) => {
          console.error(err);
          this.snackBar.open('Failed to update store', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          this.isSubmitting = false;
        }
      });
    }
  }
}