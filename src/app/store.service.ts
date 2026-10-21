import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Store } from './models/store';
import { ApiService } from 'src/app/api.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  constructor(private http: HttpClient, public apiService: ApiService) { }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }

  getStores(): Observable<Store[]> {
    return this.http.get<Store[]>(this.apiService.apiStoreInsertURL).pipe(
      catchError(this.handleError)
    );
  }

  getStore(id: number): Observable<Store> {
    return this.http.get<Store>(`${this.apiService.apiStoreInsertURL}?id=${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createStore(store: Store): Observable<any> {
    return this.http.post(this.apiService.apiStoreInsertURL, store).pipe(
      catchError(this.handleError)
    );
  }

  updateStore(store: Store): Observable<any> {
    return this.http.put(this.apiService.apiStoreInsertURL, store).pipe(
      catchError(this.handleError)
    );
  }

  deleteStore(id: number): Observable<any> {
    return this.http.delete(this.apiService.apiStoreInsertURL, { body: { id } }).pipe(
      catchError(this.handleError)
    );
  }
}