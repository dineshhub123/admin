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


  
  // employeeData(object): Observable<any> {
  //   //this.commonHeaderFunction(); 
  //   return this.http.post(this.apiURL + "user-info", object).pipe(map((res: any) => res));
  // }
  getProductListDetailsData(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiProductListURL}/${id}`);
  }
deleteProduct(id: number): Observable<any> {
  return this.http.post(this.apiDeleteProductURL, { id });
}

  getUserDetailsData(): Observable<any> {
    return this.http.get(this.getUserInfoURL).pipe(map((res: any) => res)); 
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
  
}
