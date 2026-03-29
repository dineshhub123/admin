import { Component, ViewChild, ElementRef, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as JSZip from 'jszip';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-record-video-dialog',
  templateUrl: './record-video-dialog.component.html'
})
export class RecordVideoDialogComponent {
  @ViewChild('videoPreview') videoElement!: ElementRef<HTMLVideoElement>;
  mediaRecorder: any;
  recordedChunks: Blob[] = [];
  stream: MediaStream | null = null;
  isRecording = false;
  constructor(private dialogRef: MatDialogRef<RecordVideoDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }


  ngOnInit() {

  }

  async startRecording() {
    this.stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    });
    this.videoElement.nativeElement.srcObject = this.stream;
    this.recordedChunks = [];
    this.mediaRecorder = new MediaRecorder(this.stream);
    this.mediaRecorder.ondataavailable = (event: any) => {
      if (event.data.size > 0) {
        this.recordedChunks.push(event.data);
      }
    };
    this.mediaRecorder.onstop = () => {
      const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
      this.saveVideoWithDetails(blob);
      this.stream?.getTracks().forEach(track => track.stop());
    };
    this.mediaRecorder.start();
    this.isRecording = true;
  }

  stopRecording() {
    this.mediaRecorder.stop();
    this.isRecording = false;
    this.dialogRef.close(this.data);

  }

  close() {
    this.stream?.getTracks().forEach(track => track.stop());
    this.dialogRef.close();
  }

  async saveVideoWithDetails(blob: Blob) {
    const zip = new JSZip();
    zip.file("video.webm", blob);
    const details = {
      order_id: this.data.order_id,
      total_amount: this.data.total_amount,
      items: this.data.items.map((item: any) => ({
        product_id: item.product_id,
        product_name: item.product_name,
        price: item.price,
        color: item.color,
        size: item.size,
        quantity: item.quantity
      })),
     date: new Date().toLocaleString()
    };

    zip.file("order-details.json", JSON.stringify(details, null, 2));
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, `order_${this.data.order_id}.zip`);
  }
}