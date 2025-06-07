import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { EChartsOption } from 'echarts';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  spinners = [
    { value: 75, color: 'primary', borderColorClass: 'border-primary'},
    { value: 45, color: 'accent', borderColorClass: 'border-accent' },
    { value: 90, color: 'warn', borderColorClass: 'border-warn' }
  ];

 mode: ProgressSpinnerMode = 'determinate';
  value = 80;
   rows = [
    { title: 'CPU Usage', value: 500, spinnerValue: 75, color: 'primary', borderColorClass: 'border-primary' },
    { title: 'Memory Usage', value: 120, spinnerValue: 60, color: 'accent', borderColorClass: 'border-accent' },
    { title: 'Disk Space', value: 350, spinnerValue: 90, color: 'warn',  borderColorClass: 'border-warn' },
    { title: 'Network', value: 45, spinnerValue: 45, color: 'primary', borderColorClass: 'border-primary' },
    { title: 'Network', value: 45, spinnerValue: 45, color: 'primary', borderColorClass: 'border-primary' },
    { title: 'Network', value: 45, spinnerValue: 45, color: 'primary', borderColorClass: 'border-primary' }
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
  title: {
    text: 'World'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {},
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    boundaryGap: [0, 0.01]
  },
  yAxis: {
    type: 'category',
    data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World']
  },
  series: [
    {
      name: '2011',
      type: 'bar',
      data: [18203, 23489, 29034, 104970, 131744, 630230]
    },
    {
      name: '2012',
      type: 'bar',
      data: [19325, 23438, 31000, 121594, 134141, 681807]
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
  
}
