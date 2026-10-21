import { Component } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-salereports',
  templateUrl: './salereports.component.html',
  styleUrls: ['./salereports.component.css']
})
export class SalereportsComponent {
 dailySales = 1200;
  weeklySales = 8400;
  monthlySales = 35000;
  totalOrders = 200;
  newCustomers = 50;
  returnedItems = 10;

  // Daily Sales Chart (last 7 days)
  dailyChartOptions = {
    title: { text: 'Daily Sales' },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
    yAxis: { type: 'value' },
    series: [{ data: [150, 200, 180, 220, 170, 210, 190], type: 'bar', name: 'Sales' }]
  };

  // Weekly Sales Chart (last 4 weeks)
  weeklyChartOptions = {
    title: { text: 'Weekly Sales' },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: ['Week 1', 'Week 2', 'Week 3', 'Week 4'] },
    yAxis: { type: 'value' },
    series: [{ data: [1000, 1200, 900, 1300], type: 'bar', name: 'Sales' }]
  };

  // Monthly Sales Chart (last 6 months)
  monthlyChartOptions = {
    title: { text: 'Monthly Sales' },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
    yAxis: { type: 'value' },
    series: [{ data: [5000, 6000, 5500, 7000, 6500, 7500], type: 'line', name: 'Sales' }]
  };

}
