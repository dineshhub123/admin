import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
  searchText: any;
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (typeof this.data.villages === 'string') {
      this.data.villages = JSON.parse(this.data.villages);
    }
  }

filteredVillages() {
  if (!this.data.villages) {
    return [];
  }

  if (!this.searchText) {
    return this.data.villages;
  }
  const search = this.searchText.toLowerCase().trim();
  return this.data.villages.filter((item: any) =>
    item.village.toLowerCase().includes(search) 
  // || item.postOffice.toLowerCase().includes(search)
  );
}
  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
