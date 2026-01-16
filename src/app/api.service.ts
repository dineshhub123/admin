import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map ,tap} from 'rxjs/operators';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
 
  
  headers:any;
  auth:any;
  apiProductListURL:string = environment.getProductListDetailsApiUrl;
  getUserInfoURL:string = environment.getUserDetailsApiURL;
  apiSearchURL:string = environment.searchApiUrl;
  apiUploadDataURL:string = environment.uploadDataApiUrl;
  apiInsertUserInfoURL:string = environment.insertUserDetailsApiUrl;
  apiProductNotifyURL:string = environment.getProductNotifyApiUrl;
  apiProductbuyerURL:string = environment.productBuyerApiUrl;
  apiBuyerDataURL:string = environment.getBuyerDataApiUrl;
  apiDeleteProductURL:string = environment.deleteProductListDetailsApiUrl;
  apiDeleteCustomerURL:string = environment.deleteCustomerListDetailsApiUrl;
  apiDeleteOrderURL:string = environment.deleteOrderListDetailsApiUrl;
  apiUpdateUserInfoURL:string = environment.updateUserDetailsApiUrl;
  apiUpdateProductInfoURL:string = environment.updateProductDetailsApiUrl;
  apiUpdateCategoriesInfoURL:string = environment.updateCategoryDetailsApiUrl;
  apiEditOrderInfoURL:string = environment.editOrderDetailsApiUrl;
  apiStoreInsertURL:string = environment.insertStoreDetailsApiUrl;
  apigetStoreURL:string = environment.getStoreDetailsApiUrl;
  apideleteStoreURL:string = environment.deleteStoreDetailsApiUrl;
  apiOrderListUrl:string = environment.getOrderListApiUrl;
  apiPendingOrderUrl:string = environment.getPendingOrderApiUrl;
  apiOrderByIdUrl:string = environment.getOrderByIdApiUrl;
  apiUpadateStatusUrl = environment.upadateStatusApiUrl;



  constructor(private http: HttpClient,private router:Router) { }
  
  commonHeaderFunction(){
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
  return this.http.get(this.apiProductListURL).pipe(map((res:any)=>res))
  }
  deleteProduct(id: number): Observable<any> {
  return this.http.post(this.apiDeleteProductURL, { id });
  }
  deleteCustomer(id: number): Observable<any> {
  return this.http.post(this.apiDeleteCustomerURL, { id });
  }
 deleteOrder(id: number): Observable<any> {
  return this.http.post(this.apiDeleteOrderURL, { id });
  }
  getUserDetailsData(object:any): Observable<any> {
    return this.http.post(this.getUserInfoURL,object).pipe(map((res: any) => res)); 
  }
  searchData(object:any): Observable<any> {
    return this.http.post(this.apiSearchURL,object).pipe(map((res: any) => res));
  }
  uploadData(object:any): Observable<any> {
    return this.http.post(this.apiUploadDataURL,object).pipe(map((res: any) => res));
  }
  insertUserDetails(object:any): Observable<any> {
    return this.http.post(this.apiInsertUserInfoURL,object).pipe(map((res: any) => res));
  }
  ProductNotificationDetails(object:any): Observable<any> {
    return this.http.post(this.apiProductNotifyURL,object).pipe(map((res: any) => res));
  }
  ProductBuyerDetails(object:any): Observable<any> {
    return this.http.post(this.apiProductbuyerURL,object).pipe(map((res: any) => res));
  }
  getUserBuyerDetails():Observable<any> {
    return this.http.get(this.apiBuyerDataURL).pipe(map((res:any)=>res))
  }
  updateCustomer(customerData: any): Observable<any> {
  return this.http.put(this.apiUpdateUserInfoURL, {customerData });
  }
  getCustomerById(customerData: any): Observable<any> {
  return this.http.put(this.apiUpdateUserInfoURL, {customerData });
  }
  updateProduct(id: number): Observable<any> {
  return this.http.put(this.apiUpdateProductInfoURL, {id });
  }
  getCategories(id: number): Observable<any> {
  return this.http.put(this.apiUpdateProductInfoURL, {id });
  }
  updateOrder(id: number): Observable<any> {
  return this.http.put(this.apiEditOrderInfoURL, {id });
  }
  deletestorelist(id: number): Observable<any> {
  return this.http.post(this.apideleteStoreURL, {id });
  }
  getStorelist(): Observable<any> {
  return this.http.get(this.apigetStoreURL).pipe(map((res:any)=>res))
  }
  getOrderList():Observable<any>{
    return this.http.get(this.apiOrderListUrl).pipe(map((res:any)=>res))
  }
  getPendingOrder():Observable<any>{
    return this.http.get(this.apiPendingOrderUrl).pipe(map((res:any)=>res))
  }
  getOrderByID(orderId:number):Observable<any>{
    return this.http.get(`${this.apiOrderByIdUrl}?order_id=${orderId}`).pipe(map((res:any)=>res))
  }
  updateOrderStatus(object:any): Observable<any> {
    return this.http.post(this.apiUpadateStatusUrl,object).pipe(map((res: any) => res));
  }

}
