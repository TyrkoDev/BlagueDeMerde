import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dataSource = [{
    position: 1,
    name: 'Driss',
    points: 7
  }];
  team = {
    name: 'Distrib'
  };

  displayedColumns: string[] = ['position', 'name', 'points'];

  constructor() { }

  ngOnInit() { }

}
