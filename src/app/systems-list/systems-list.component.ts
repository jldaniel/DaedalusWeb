import { Component, OnInit } from '@angular/core';
import {DaedalusService} from '../services/daedalus/daedalus.service';
import {System} from '../services/daedalus/System';

@Component({
  selector: 'app-systems',
  templateUrl: './systems-list.component.html',
  styleUrls: ['./systems-list.component.css']
})
export class SystemsListComponent implements OnInit {

  systems: System[];

  constructor(private daedalus: DaedalusService) {

  }

  ngOnInit() {
    this.daedalus.getSystems().subscribe(data => {
      console.log(data);
      this.systems = data;
    });
  }

}
