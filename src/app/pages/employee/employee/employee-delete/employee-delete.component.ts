import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/api.service';
export interface Employee {
  id: number;
  employeeId: string;
  fullName: string;
}


@Component({
  selector: 'app-employee-delete',
  templateUrl: './employee-delete.component.html',
  styleUrls: ['./employee-delete.component.css']
})

export class EmployeeDeleteComponent {
loading = false;

  constructor(
    public apiService: ApiService,
    private dialogRef: MatDialogRef<EmployeeDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee
  ) {}

deleteEmployee() {
  console.log('DELETE DATA:', this.data);

  const id = Number(this.data?.id);

  if (!id) {
    alert('Employee ID is missing');
    return;
  }

  this.apiService.deleteEmployee(id).subscribe({
    next: () => {
      this.dialogRef.close(true);
    },
    error: (err) => {
      console.error('DELETE ERROR', err);
      alert('Failed to delete');
    }
  });
}



  close() {
    this.dialogRef.close(false);
  }
}
