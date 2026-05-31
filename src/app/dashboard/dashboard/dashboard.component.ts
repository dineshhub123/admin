import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { EChartsOption } from 'echarts';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { trigger, transition, animate, style } from '@angular/animations';
import { range } from 'rxjs';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private breakpointObserver: BreakpointObserver, public apiService: ApiService) { }

fromDate: Date | null = null;
toDate: Date | null = null;
  yLabels: any;
  seriesData: any;
  orderStatusDistribution: EChartsOption = {};
  paymentMethodDistribution: EChartsOption = {};
  productCategorySales: EChartsOption = {};
  salesBySource: EChartsOption = {};
  revenue: any[] = [];
  pending: any[] = [];
  expenses: any[] = [];
  spinners = [
    { value: 75, color: 'primary', borderColorClass: 'border-primary' },
    { value: 45, color: 'accent', borderColorClass: 'border-accent' },
    { value: 90, color: 'warn', borderColorClass: 'border-warn' }
  ];

  mode: ProgressSpinnerMode = 'determinate';
  //value = 80;

  ngOnInit() {
    this.getAdminDashboardDetails(`?from=${''}&to=${''}`);
  }
  resetDateRange(){
  this.getAdminDashboardDetails(`?from=${''}&to=${''}`);
  this.fromDate = null;
  this.toDate = null;
  }
  onDateRangeChange() {
  if (!this.fromDate || !this.toDate) return;
  const from = this.formatDate(this.fromDate);
  const to = this.formatDate(this.toDate);
  const query = `?from=${from}&to=${to}`;
  this.getAdminDashboardDetails(query);
}
formatDate(date: Date): string {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = ('0' + (d.getMonth() + 1)).slice(-2);
  const day = ('0' + d.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}

  getAdminDashboardDetails(query:any) {
    this.apiService.getDashboardData(query).subscribe((res: any) => {
      const row1 = res?.dashboard?.cards?.row1;
      const row2 = res?.dashboard?.cards?.row2;
      const row3 = res?.dashboard?.cards?.row3;

      const charts = res?.dashboard?.charts;

      // ✅ ROW 1 (6 Cards)
      this.revenue = [
        {
          title: 'Total Revenue (₹)',
          value: row1?.revenue || 0,
          spinnerValue: row1?.revenue || 0,
          color: 'primary',
          borderColorClass: 'border-primary'
        },
        {
          title: 'Total Orders',
          value: row1?.orders || 0,
          spinnerValue: row1?.orders || 0,
          color: 'accent',
          borderColorClass: 'border-accent'
        },
        {
          title: 'Net Profit (₹)',
          value: row1?.profit || 0,
          spinnerValue: row1?.profit || 0,
          color: 'warn',
          borderColorClass: 'border-warn'
        },
        {
          title: 'Total Customers',
          value: row1?.customers || 0,
          spinnerValue: row1?.customers || 0,
          color: 'primary',
          borderColorClass: 'border-primary'
        },
        {
          title: 'Average Order Value (AOV)',
          value: row1?.aov || 0,
          spinnerValue: row1?.aov || 0,
          color: 'primary',
          borderColorClass: 'border-primary'
        },
        {
          title: 'Total Items Sold',
          value: row1?.items_sold || 0,
          spinnerValue: row1?.items_sold || 0,
          color: 'primary',
          borderColorClass: 'border-primary'
        }
      ];

      // ✅ ROW 2 (Operations)
      this.pending = [
        {
          title: 'Pending Orders',
          value: row2?.pending || 0,
          barValue: row2?.pending || 0,
          color: 'accent',
          borderColorClassone: 'border-accent'
        },
        {
          title: 'Delivered Orders',
          value: row2?.delivered || 0,
          barValue: row2?.delivered || 0,
          color: 'primary',
          borderColorClassone: 'border-primary'
        },
        {
          title: 'Returned Orders',
          value: row2?.returns || 0,
          barValue: row2?.returns || 0,
          color: 'warn',
          borderColorClassone: 'border-warn'
        },
        {
          title: 'Low Stock Products',
          value: row2?.low_stock || 0,
          barValue: row2?.low_stock || 0,
          color: 'warn',
          borderColorClassone: 'border-warn'
        }
      ];

      // ✅ ROW 3 (Finance)
      this.expenses = [
        {
          title: 'Total Expenses (₹)',
          value: row3?.expenses || 0,
          barValue: row3?.expenses || 0,
          color: 'primary',
          borderColorClassone: 'border-primary'
        },
        {
          title: 'Discount Given (₹)',
          value: row3?.discount || 0,
          barValue: row3?.discount || 0,
          color: 'accent',
          borderColorClassone: 'border-accent'
        },
        {
          title: 'GST Collected (₹)',
          value: row3?.gst || 0,
          barValue: row3?.gst || 0,
          color: 'warn',
          borderColorClassone: 'border-warn'
        },
        {
          title: 'Refund Amount (₹)',
          value: row3?.refund || 0,
          barValue: row3?.refund || 0,
          color: 'primary',
          borderColorClassone: 'border-primary'
        }
      ];

      // 🥧 1. ORDER STATUS PIE
      // =========================
      this.orderStatusDistribution = {
        tooltip: { trigger: 'item' },
        legend: {
          type: 'scroll',
          orient: 'horizontal',
          //left: 0,
          top: '90%',
          // bottom: '0%',
          textStyle: {
            fontSize: 12
          }
        },

        series: [
          {
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '45%'], // 👈 moved up
            data: charts?.order_status || []
          }
        ]
      };

      // =========================
      // 💳 2. PAYMENT METHOD PIE
      // =========================
      this.paymentMethodDistribution = {
        tooltip: { trigger: 'item' },
        legend: {
          type: 'scroll',
          orient: 'horizontal',
          //left: 0,
          top: '90%',
          //bottom: '0%',
          textStyle: {
            fontSize: 12
          }
        },

        series: [
          {
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '45%'], // 👈 moved up
            data: charts?.payment_methods || []
          }
        ]
      };

      // =========================
      // 📦 3. CATEGORY SALES (DONUT)
      // =========================
      this.productCategorySales = {
        tooltip: { trigger: 'item' },
        legend: {
          type: 'scroll',
          orient: 'horizontal',
          //left: 0,
          top: '90%',
          textStyle: {
            fontSize: 12
          }
        },
        series: [
          {
            name: 'Sales By Category',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '45%'], // 👈 moved up
            data: charts?.category_sales || []
          }
        ]
      };

      // =========================
      // 🌍 4. SALES SOURCE (DONUT)
      // =========================
      this.salesBySource = {
        tooltip: { trigger: 'item' },
        legend: {
          type: 'scroll',
          orient: 'horizontal',
          //left: 0,
          top: '90%',
          textStyle: {
            fontSize: 12
          }
        },
        series: [
          {
            name: 'Sales Source',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '45%'], // 👈 moved up
            data: charts?.sales_channel || []
          }
        ]
      };

    }, err => {
      console.error("Dashboard API error", err);
    });
  }
}
