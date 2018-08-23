import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { DaedalusService } from '../services/daedalus/daedalus.service';
import { switchMap } from 'rxjs/operators';
import { System } from '../services/daedalus/System';
import {Data, DataSet, InputData, OutputData} from '../services/daedalus/DataSet';


@Component({
  selector: 'app-new-dataset',
  templateUrl: './new-dataset.component.html',
  styleUrls: ['./new-dataset.component.css']
})
export class NewDatasetComponent implements OnInit {

  data;
  tableColumnNames = [];
  system: System;
  nCols = 0;
  nRuns = 1;


  constructor(private daedalus: DaedalusService,
              private router: Router,
              private route: ActivatedRoute) {

  }


  ngOnInit() {

    /* Pull in the associated system */
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.daedalus.getSystem(Number(params.get('id'))))
    ).subscribe(data => {
      this.system = data;

      for (const inputVariable of this.system.input_variables) {
        this.tableColumnNames.push(inputVariable.name);
        this.nCols++;
      }

      for (const outputVariable of this.system.output_variables) {
        this.tableColumnNames.push(outputVariable.name);
        this.nCols++;
      }

      const initialData = new Array(this.nCols);
      for (let i = 0; i < this.nCols; i++) {
        initialData[i] = 0.0;
      }

      const tableData = {};
      for (const colName of this.tableColumnNames) {
        tableData[colName] = '0.0';
      }

      this.data = [tableData];
    });
  }

  updateValue(event, cell, rowIndex) {
    this.data[rowIndex][cell] = event.target.value;
    this.data = [...this.data];
  }

  addRun(): void {
    const tableData = {};
    for (const colName of this.tableColumnNames) {
      tableData[colName] = '0.0';
    }

    this.data.push(tableData);
    this.data = [...this.data];
    this.nRuns++;
  }

  submit(): void {
    console.log('Submitting Data');
    console.log(this.data);

    /* Create the dataset model */
    const dataset = <DataSet>{};
    const data = <Data>{};
    data.inputs = [];
    data.outputs = [];

    for (const inputVar of this.system.input_variables) {
      const input_data = <InputData>{};
      input_data.name = inputVar.name;
      input_data.values = [];
      for (let rowId = 0; rowId < this.nRuns; rowId++) {
        input_data.values.push(this.data[rowId][inputVar.name]);
      }

      data.inputs.push(input_data);
    }

    for (const outputVar of this.system.output_variables) {
      const output_data = <OutputData>{};
      output_data.name = outputVar.name;
      output_data.values = [];
      for (let rowId = 0; rowId < this.nRuns; rowId++) {
        output_data.values.push(this.data[rowId][outputVar.name]);
      }
      data.outputs.push(output_data);
    }

    /* TODO: Update dataset description */
    dataset.description = 'Dataset generated from web client';
    dataset.data = data;

    console.log('dataset');
    console.log(dataset);
    this.daedalus.createDataSet(this.system.id, dataset).subscribe(response_data => {
      console.log('New dataset created');
      console.log(response_data);
      this.router.navigate(['/systems/' + this.system.id]);
    });
  }
}
