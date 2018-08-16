import { Component, OnInit } from '@angular/core';
import {DaedalusService} from '../services/daedalus/daedalus.service';
import {System} from '../services/daedalus/System';

@Component({
  selector: 'app-systems',
  templateUrl: './systems.component.html',
  styleUrls: ['./systems.component.css']
})
export class SystemsComponent implements OnInit {

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
