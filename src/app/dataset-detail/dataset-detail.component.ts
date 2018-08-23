import { Component, OnInit } from '@angular/core';
import { DaedalusService } from '../services/daedalus/daedalus.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { DataSet } from '../services/daedalus/DataSet';

@Component({
  selector: 'app-dataset-detail',
  templateUrl: './dataset-detail.component.html',
  styleUrls: ['./dataset-detail.component.css']
})
export class DatasetDetailComponent implements OnInit {

  dataset?: DataSet;
  dataset_data;
  dataset_columns;

  constructor(private daedalus: DaedalusService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.daedalus.getDataSet(Number(params.get('id'))))
    ).subscribe(data => {
      this.dataset = data;

      this.dataset_data = [];
      this.dataset_columns = [];

      const varIdxMap = {};

      this.dataset.data.inputs.forEach((input, index) => {
        this.dataset_columns.push(input.name);
        varIdxMap[input.name] = index;
      });

      this.dataset.data.outputs.forEach((output, index) => {
        this.dataset_columns.push(output.name);
        varIdxMap[output.name] = index;
      });


      for (let i = 0; i < this.dataset.runs; i++) {
        const data_point = {};

        for (const input of this.dataset.data.inputs) {
          const varIdx = varIdxMap[input.name];
          data_point[input.name] = this.dataset.data.inputs[varIdx].values[i];
        }

        for (const output of this.dataset.data.outputs) {
          const varIdx = varIdxMap[output.name];
          data_point[output.name] = this.dataset.data.outputs[varIdx].values[i];
        }

        this.dataset_data.push(data_point);

      }

      this.dataset_data = [...this.dataset_data];
      console.log(this.dataset);
      console.log(this.dataset_data);

    });
  }

}
