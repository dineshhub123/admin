import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-google-authenticator-setup',
  templateUrl: './google-authenticator-setup.component.html',
  styleUrls: ['./google-authenticator-setup.component.css']
})
export class GoogleAuthenticatorSetupComponent implements OnInit {
  secretKey = '';
  qrCodeUrl = '';

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
    this.generateTwoFectorQr()
  }

  generateTwoFectorQr() {
    const user = JSON.parse(
      sessionStorage.getItem('pending_user') || '{}'
    );
    let payload = {
      admin_id: user?.admin_id
    }
    this.apiService.generateTwoFectorQr(payload).subscribe((respose: any) => {
      this.qrCodeUrl = respose?.qr_image;
      this.secretKey = respose?.secret_key
    })
  }

  copySecretKey() {
    navigator.clipboard.writeText(this.secretKey);
  }
  
  continueSetup() {
    this.router.navigate(['/2fa-otp']);
  }

}