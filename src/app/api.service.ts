import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {


  headers: any;
  auth: any;
  apiProductListURL: string = environment.getProductListDetailsApiUrl;
  getAdminLoginURL: string = environment.getAdminLoginDetailsApiURL;
  apiSearchURL: string = environment.searchApiUrl;
  apiUploadDataURL: string = environment.uploadDataApiUrl;
  apiInsertAdminLoginURL: string = environment.insertAdminLoginDetailsApiUrl;
  apiProductNotifyURL: string = environment.getProductNotifyApiUrl;
  apiDeleteProductURL: string = environment.deleteProductListDetailsApiUrl;
  apiDeleteCustomerURL: string = environment.deleteCustomerListDetailsApiUrl;
  apiDeleteOrderURL: string = environment.deleteOrderListDetailsApiUrl;
  apiUpdateUserInfoURL: string = environment.updateUserDetailsApiUrl;
  apiUpdateProductInfoURL: string = environment.updateProductDetailsApiUrl;
  apiUpdateCategoriesInfoURL: string = environment.updateCategoryDetailsApiUrl;
  apiEditOrderInfoURL: string = environment.editOrderDetailsApiUrl;
  apiStoreInsertURL: string = environment.insertStoreDetailsApiUrl;
  apigetStoreURL: string = environment.getStoreDetailsApiUrl;
  apideleteStoreURL: string = environment.deleteStoreDetailsApiUrl;
  apiOrderListUrl: string = environment.getOrderListApiUrl;
  apiPendingOrderUrl: string = environment.getPendingOrderApiUrl;
  apiOrderByIdUrl: string = environment.getOrderByIdApiUrl;
  apiUpadateStatusUrl = environment.upadateStatusApiUrl;
  apiGetEmployeeURL: string = environment.getEmployeeDetailsApiUrl;
  apiSaveEmployeeURL: string = environment.saveEmployeeDetailsApiUrl;
  apiUpdateEmployeeURL: string = environment.updateEmployeeDetailsApiUrl;
  apiDeleteEmployeeURL: string = environment.deleteEmployeeDetailsApiUrl;
  apiOrderListByStatusUrl: string = environment.getOrderListByStatusApiUrl;
  apiDownloadSalaryURL: string = environment.getSalarySlipApiUrl;
  apiSendOtpUrl:string = environment.sendOtpApiUrl;
  apiVerifyOtpUrl:string = environment.verifyOtpApiUrl


  constructor(private http: HttpClient, private router: Router) { }

  commonHeaderFunction() {
    this.auth = '';
    if (localStorage.getItem("jwt_token") !== null) {
      this.auth = 'Bearer ' + localStorage.getItem("jwt_token");
      this.headers = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': this.auth,
        })
      };
    }
  }
  getProductListDetailsData(): Observable<any> {
    return this.http.get(this.apiProductListURL).pipe(map((res: any) => res))
  }
  deleteProduct(productId: string): Observable<any> {
    return this.http.post(this.apiDeleteProductURL, { product_id: productId });

  } deleteCustomer(id: number): Observable<any> {
    return this.http.post(this.apiDeleteCustomerURL, { id });
  }
  deleteOrder(id: number): Observable<any> {
    return this.http.post(this.apiDeleteOrderURL, { id });
  }
  getAdminLoginDetailsData(object: any): Observable<any> {
    return this.http.post(this.getAdminLoginURL, object).pipe(map((res: any) => res));
  }
  searchData(object: any): Observable<any> {
    return this.http.post(this.apiSearchURL, object).pipe(map((res: any) => res));
  }
  uploadData(object: any): Observable<any> {
    return this.http.post(this.apiUploadDataURL, object).pipe(map((res: any) => res));
  }
  insertAdminDetails(object: any): Observable<any> {
    return this.http.post(this.apiInsertAdminLoginURL, object).pipe(map((res: any) => res));
  }
  ProductNotificationDetails(object: any): Observable<any> {
    return this.http.post(this.apiProductNotifyURL, object).pipe(map((res: any) => res));
  }
  updateCustomer(customerData: any): Observable<any> {
    return this.http.put(this.apiUpdateUserInfoURL, { customerData });
  }
  getCustomerById(customerData: any): Observable<any> {
    return this.http.put(this.apiUpdateUserInfoURL, { customerData });
  }
  updateProduct(object:any): Observable<any> {
    return this.http.post(this.apiUpdateProductInfoURL, object).pipe(map((res: any) => res));
  }
  updateOrder(id: number): Observable<any> {
    return this.http.put(this.apiEditOrderInfoURL, { id });
  }
  deletestorelist(id: number): Observable<any> {
    return this.http.post(this.apideleteStoreURL, { id });
  }
  getStorelist(): Observable<any> {
    return this.http.get(this.apigetStoreURL).pipe(map((res: any) => res))
  }
  getOrderList(): Observable<any> {
    return this.http.get(this.apiOrderListUrl).pipe(map((res: any) => res))
  }
  getPendingOrder(): Observable<any> {
    return this.http.get(this.apiPendingOrderUrl).pipe(map((res: any) => res))
  }
  getOrderByID(orderId: number): Observable<any> {
    return this.http.get(`${this.apiOrderByIdUrl}?order_id=${orderId}`).pipe(map((res: any) => res))
  }
  updateOrderStatus(object: any): Observable<any> {
    return this.http.post(this.apiUpadateStatusUrl, object).pipe(map((res: any) => res));
  }
  getOrderByStatus(status: string): Observable<any> {
    return this.http.get(`${this.apiOrderListByStatusUrl}?status=${status}`).pipe(map((res: any) => res))
  }
  getEmployees() {
    return this.http.get(this.apiGetEmployeeURL).pipe(map((res: any) => res));
  }
  getEmployeeById(id: number) {
    return this.http.get(`${this.apiGetEmployeeURL}?id=${id}`).pipe(map((res: any) => res));
  }
  saveEmployee(object: FormData) {
    return this.http.post(this.apiSaveEmployeeURL, object).pipe(map((res: any) => res));
  }
  updateEmployee(formData: FormData) {
    return this.http.post(this.apiUpdateEmployeeURL, formData).pipe(map((res: any) => res));
  }
  deleteEmployee(id: number) {
    return this.http.delete(`${this.apiDeleteEmployeeURL}?id=${id}`).pipe(map((res: any) => res));
  }
  downloadSalarySlip(employeeId: number, month: string) {
    return this.http.get(
      `${this.apiDownloadSalaryURL}?employee_id=${employeeId}&month=${month}`,
      { responseType: 'blob' }
    );
  }
  sendOtp(object: any): Observable<any>  {
    return this.http.post(this.apiSendOtpUrl, object).pipe(map((res: any) => res));
  }

  verifyOtp(object: any): Observable<any>  {
    return this.http.post(this.apiVerifyOtpUrl, object).pipe(map((res: any) => res));
  }


}
