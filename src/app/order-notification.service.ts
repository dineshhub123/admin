import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderNotificationService {
  // 🔔 Total pending count (for badge)
  private pendingCountSource = new BehaviorSubject<number>(0);
  pendingCount$ = this.pendingCountSource.asObservable();

  // 📌 Only 5 latest pending orders (for dropdown list)
  private previewSource = new BehaviorSubject<any[]>([]);
  preview$ = this.previewSource.asObservable();

  // 🧾 Full pending list (optional, if you want)
  private allPendingSource = new BehaviorSubject<any[]>([]);
  allPending$ = this.allPendingSource.asObservable();

  constructor() {}

  // ✅ Call this whenever you fetch pending orders API
  setPendingOrders(list: any[]) {
    const safeList = Array.isArray(list) ? list : [];
    this.allPendingSource.next(safeList);
    this.previewSource.next(safeList.slice(0, 5));
    this.pendingCountSource.next(safeList.length);
  }

  // ✅ Clear when logout
  clear() {
    this.allPendingSource.next([]);
    this.previewSource.next([]);
    this.pendingCountSource.next(0);
  }

  // ✅ Optional: update count manually
  setCount(count: number) {
    this.pendingCountSource.next(count || 0);
  }
  
}
