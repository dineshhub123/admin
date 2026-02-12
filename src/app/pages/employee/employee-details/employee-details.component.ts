import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent {
personalForm: FormGroup;
  salaryForm: FormGroup;

  months = ['January 2026', 'December 2025', 'November 2025'];
  employeeId: any;
  employeeDbId: any;
  employee: any;

  constructor(private fb: FormBuilder, private route: ActivatedRoute,  public apiService: ApiService,) {

    this.personalForm = this.fb.group({
  fullName: [''],
  mobile: [''],
  employeeId: [''],
  email: [''],
  dob: [''],
  gender: [''],
  bloodGroup: ['']
});


    this.salaryForm = this.fb.group({
      month: ['']
    });
  }
ngOnInit() {
  const id = Number(this.route.snapshot.paramMap.get('id'));
  if (id) {
    this.getEmployeeById(id);
  }
}

downloadSlip(month: string) {
  this.apiService
    .downloadSalarySlip(this.employeeId, month)
    .subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Salary_Slip_${month}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Download failed', err);
      }
    });
}

  getEmployeeById(id: number): void {
  this.apiService.getEmployeeById(id).subscribe({
    next: (res: any) => {
      if (res.status === 'success') {
        this.employee = res.data;
      }
    }
  });
}

}
