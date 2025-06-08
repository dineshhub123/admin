import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { EChartsOption } from 'echarts';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { trigger, transition, animate, style } from '@angular/animations';
import { range } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
 selectedDate: Date = new Date();
yLabels:any;
seriesData:any;
  spinners = [
    { value: 75, color: 'primary', borderColorClass: 'border-primary'},
    { value: 45, color: 'accent', borderColorClass: 'border-accent' },
    { value: 90, color: 'warn', borderColorClass: 'border-warn' }
  ];

 mode: ProgressSpinnerMode = 'determinate';
  value = 80;
   rows = [
    { title: 'Number of Orders', value: 500, spinnerValue: 75, color: 'primary', borderColorClass: 'border-primary' },
    { title: 'Items Ordered', value: 120, spinnerValue: 60, color: 'accent', borderColorClass: 'border-accent' },
    { title: 'Shipping', value: 350, spinnerValue: 90, color: 'warn',  borderColorClass: 'border-warn' },
    { title: 'Discount', value: 45, spinnerValue: 45, color: 'primary', borderColorClass: 'border-primary' },
    { title: 'Invoiced', value: 45, spinnerValue: 45, color: 'primary', borderColorClass: 'border-primary' },
    { title: 'Refunded', value: 45, spinnerValue: 45, color: 'primary', borderColorClass: 'border-primary' }
  ];
 progressbar = [
    { title: 'CPU Usage', value: 75, barValue: 75, color: 'primary', borderColorClassone: 'border-primary' },
    { title: 'Memory Usage', value: 60, barValue: 60, color: 'accent',borderColorClassone: 'border-accent' },
    { title: 'Disk Space', value: 90, barValue: 90, color: 'warn',borderColorClassone: 'border-warn' },
    { title: 'Network', value: 45, barValue: 45, color: 'primary', borderColorClassone: 'border-primary' }
  ];
card = [
    { title: 'Card 1', content: 'Content for card 1.' },
    { title: 'Card 2', content: 'Content for card 2.' },
    { title: 'Card 3', content: 'Content for card 3.' }
  ];
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 },
        ];
      }
      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 },
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
 barChartOption: EChartsOption = {};
  pieChartOption: EChartsOption = {};
  velocityChartOption: EChartsOption = {};
  ngOnInit() {
 this.updateChart('day'); 
  console.log(this.rows, 'rows');

 this.velocityChartOption = {
  xAxis: {},
  yAxis: {},
  series: [
    {
      data: [
        [10, 40],
        [50, 100],
        [40, 20]
      ],
      type: 'line'
    }
  ]
};
 this.barChartOption = {
  
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' }
  },
  legend: {},
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['Item 1']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'Sales',
      type: 'bar',
      data: [10]  // Correct array of numbers
    }
  ]
};

  

    this.pieChartOption = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [{
        name: 'Access Source',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 30,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Ads' },
          { value: 300, name: 'Video' }
        ]
      }]
    };

  }

 onDateChange(): void {
    const today = this.selectedDate;
    const now = new Date();

    if (
      today.getDate() === now.getDate() &&
      today.getMonth() === now.getMonth() &&
      today.getFullYear() === now.getFullYear()
    ) {
      this.updateChart('day');
    } else if (today.getFullYear() === now.getFullYear()) {
      this.updateChart('month');
    } else {
      this.updateChart('year');
    }
  }

updateChart(p0: string): void {
    const range = this.selectedDate;

    this.barChartOption = {
      title: {
        text: `Sales Data (${range})`  // This WILL show "Sales Data (day)" or similar
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      xAxis: {
        type: 'category',
        data: ['A', 'B', 'C']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Sales',
          type: 'bar',
          data: [10, 20, 30]
        }
      ]
    };
  }
}
