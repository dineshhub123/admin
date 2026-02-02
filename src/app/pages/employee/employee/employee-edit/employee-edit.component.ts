import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent {
  employeeId!: number;
  personalForm: any;  
  isEditMode: boolean = false; // toggle edit mode
  photoFile: File | null = null;
  photoPreview: string | null = null;
 selectedFile: File | null = null;
constructor(
  public router: Router,
    private fb: FormBuilder,
     private route: ActivatedRoute,  
     public apiService: ApiService
  ) {}
ngOnInit(): void {

  this.personalForm = this.fb.group({
      fullName: [''],
      mobile: [''],
      employeeId: [''],
      email: [''],
      dob: [''],
      gender: [''],
      bloodGroup: ['']
    });
    this.employeeId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.employeeId) {
      this.getEmployeeById(this.employeeId);
    }
}



getEmployeeById(id: number) {
    this.apiService.getEmployeeById(id).subscribe(res => {
      if (res.status === 'success') {
        const emp = res.data;

        // Patch form values
        this.personalForm.patchValue({
          fullName: emp.full_name,
          mobile: emp.mobile,
          employeeId: emp.employee_id,
          email: emp.email,
          dob: emp.dob ? new Date(emp.dob) : null,
          gender: emp.gender,
          bloodGroup: emp.blood_group
        });

        // Show existing photo
        if (emp.photo) {
          this.photoPreview = `http://localhost/uploads/${emp.photo}`;
        }
      }
    });
  }

 // Enable edit mode
  enableEdit() {
    this.isEditMode = true;
  }

  // Cancel edit
  cancelEdit() {
    this.isEditMode = false;
    this.getEmployeeById(this.employeeId); 
  }

  // Update employee
updateEmployee() {
  if (this.personalForm.invalid) return;

  const formData = new FormData();
  formData.append('id', this.employeeId.toString());

  Object.entries(this.personalForm.getRawValue()).forEach(([key, value]) => {
  if (value !== null && value !== undefined) {

    if (key === 'dob' && value instanceof Date) {
      const yyyy = value.getFullYear();
      const mm = String(value.getMonth() + 1).padStart(2, '0');
      const dd = String(value.getDate()).padStart(2, '0');
      formData.append(key, `${yyyy}-${mm}-${dd}`);
    } else {
      formData.append(key, value.toString());
    }
  }
});

if (this.selectedFile) {
    formData.append('photo', this.selectedFile);
  }

  this.apiService.updateEmployee(formData).subscribe({
    next: res => {
      alert(res.message);
      this.isEditMode = false;
      this.getEmployeeById(this.employeeId); // refresh
    },
    error: err => {
      alert(err.error?.message || 'Update failed');
    }
  });
}


onPhotoSelect(event: any) {
  const file = event.target.files[0];
  if (!file) return;

  this.selectedFile = file;

  // Preview new image
  const reader = new FileReader();
  reader.onload = () => {
    this.photoPreview = reader.result as string;
  };
  reader.readAsDataURL(file);
}





}
