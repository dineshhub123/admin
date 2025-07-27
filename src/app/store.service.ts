import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Store } from './models/store';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private apiUrl = 'http://localhost/admin/backend/insertstoreList.php';

  constructor(private http: HttpClient) { }

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
    return this.http.get<Store[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getStore(id: number): Observable<Store> {
    return this.http.get<Store>(`${this.apiUrl}?id=${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createStore(store: Store): Observable<any> {
    return this.http.post(this.apiUrl, store).pipe(
      catchError(this.handleError)
    );
  }

  updateStore(store: Store): Observable<any> {
    return this.http.put(this.apiUrl, store).pipe(
      catchError(this.handleError)
    );
  }

  deleteStore(id: number): Observable<any> {
    return this.http.delete(this.apiUrl, { body: { id } }).pipe(
      catchError(this.handleError)
    );
  }
}