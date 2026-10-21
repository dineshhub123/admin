import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent {
  selectedFile!: File;
  photoPreview: any;

  personalForm = this.fb.group({
    fullName: ['', Validators.required],
    mobile: ['', Validators.required],
    employeeId: ['', Validators.required],
    email: [''],
    dob: [''],
    gender: [''],
    bloodGroup: ['']
  });

  constructor(
  public router: Router,
    private fb: FormBuilder,
     private route: ActivatedRoute,  
     public apiService: ApiService
  ) {}

  onPhotoSelect(event: any) {
    this.selectedFile = event.target.files[0];

    const reader = new FileReader();
    reader.onload = () => this.photoPreview = reader.result;
    reader.readAsDataURL(this.selectedFile);
  }

 saveEmployee() {
  if (this.personalForm.invalid) {
    alert('Please fill all required fields.');
    return;
  }
  if (!this.selectedFile) {
    alert('Please upload photo before saving');
    return;
  }
  const formData = new FormData();
  Object.entries(this.personalForm.value).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      if (key === 'dob') {
        if (value && value !== '0000-00-00') {
          const dateValue = new Date(value);
          if (!isNaN(dateValue.getTime())) {
            const formatted = this.formatDate(dateValue);
            formData.append(key, formatted);
          } else {
            formData.append(key, '');
          }
        } else {
          formData.append(key, '');
        }
      } else {
        formData.append(key, value.toString());
      }
    }
  });


  formData.append('photo', this.selectedFile);
  this.apiService.saveEmployee(formData).subscribe({
    next: (res: any) => {
      alert(res.message);
      this.router.navigate(['/employees']);
    },
    error: (err) => {
      alert(err.error?.message || 'Error saving employee');
    }
  });
}

// Optional: format Date object to yyyy-mm-dd
private formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}


}
