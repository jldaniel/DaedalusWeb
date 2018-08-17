import { Component, OnInit } from '@angular/core';
import { System } from '../services/daedalus/System';
import { DaedalusService } from '../services/daedalus/daedalus.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';


@Component({
  selector: 'app-system-detail',
  templateUrl: './system-detail.component.html',
  styleUrls: ['./system-detail.component.css']
})
export class SystemDetailComponent implements OnInit {

  system?: System;

  constructor(private daedalus: DaedalusService, private route: ActivatedRoute) { }

  ngOnInit() {
    /* Get the system */
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.daedalus.getSystem(Number(params.get('id'))))
    ).subscribe(data => {
      this.system = data;
    });
  }

}
