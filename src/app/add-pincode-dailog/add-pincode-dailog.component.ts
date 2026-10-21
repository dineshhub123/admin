import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';
import { Inject } from '@angular/core';
@Component({
  selector: 'app-add-pincode-dailog',
  templateUrl: './add-pincode-dailog.component.html',
  styleUrls: ['./add-pincode-dailog.component.css']
})
export class AddPincodeDailogComponent {
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddPincodeDailogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
    public toastr: ToastrService
  ) { }

  addPincodeForm = this.fb.group({
    pincode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
    area: ['', Validators.required],
    status: ['', Validators.required]
  });

  ngOnInit() {
    if (this.data) {
      this.isEdit = true;
      this.addPincodeForm.patchValue({
        pincode: this.data.pincode,
        area: this.data.area,
        status: this.data.status
      });
    }

  }
  submit() {
    if (this.isEdit) {
      this.updatePincode();
    } else {
      this.addPincode();
    }
  }
  updatePincode() {
    const payload = {
      id: this.data.id,
      pincode: Number(this.addPincodeForm.value.pincode),
      area: this.addPincodeForm.value.area,
      status: this.addPincodeForm.value.status
    };

    this.apiService.updatePincode(payload).subscribe({
      next: (res: any) => {
        if (res.status === 'success') {
          this.toastr.success(res.message);
          this.dialogRef.close(true);
        } else {
          this.toastr.error(res.message);
        }

      },
      error: (err) => {
        this.toastr.error(err.error?.message || 'Something went wrong');
      }
    });
  }

  addPincode() {
    if (this.addPincodeForm.invalid) {
      this.addPincodeForm.markAllAsTouched();
      return;
    }

    const payload = {
      pincode: Number(this.addPincodeForm.value.pincode),
      area: this.addPincodeForm.value.area,
      status: this.addPincodeForm.value.status
    };

    this.apiService.addPincodeManage(payload).subscribe({
      next: (res: any) => {
        console.log(res);

        if (res.status === 'success') {
          this.dialogRef.close(true);
          this.toastr.success(res?.message)

        } else {
          this.toastr.error(res?.message)
        }
      },
      error: (err) => {
        console.error(err);
        this.toastr.error(err.error?.message || 'Something went wrong');
      }
    });

  }


}