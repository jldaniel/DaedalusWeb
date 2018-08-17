import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, FormArray} from '@angular/forms';

import {InputVariable} from '../services/daedalus/InputVariable';
import {OutputVariable} from '../services/daedalus/OutputVariable';
import {System} from '../services/daedalus/System';

@Component({
  selector: 'app-new-system',
  templateUrl: './new-system.component.html',
  styleUrls: ['./new-system.component.css']
})
export class NewSystemComponent implements OnInit {

  system: System;
  systemForm: FormGroup;
  inputVariables: FormArray;
  outputVariables: FormArray;


  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {

    this.systemForm = this.formBuilder.group({
      name: new FormControl(''),
      description: new FormControl(''),
      inputVariables: this.formBuilder.array([this.createInputVariable()]),
      outputVariables: this.formBuilder.array([this.createOutputVariable()])
    });

  }

  createInputVariable(): FormGroup {
    return this.formBuilder.group({
      name: ''
    });
  }

  createOutputVariable(): FormGroup {
    return this.formBuilder.group({
      name: ''
    });
  }

  addInputVariable(): void {
    this.inputVariables = this.systemForm.get('inputVariables') as FormArray;
    this.inputVariables.push(this.createInputVariable());
  }

  addOutputVariable() {
    this.outputVariables = this.systemForm.get('outputVariables') as FormArray;
    this.outputVariables.push(this.createOutputVariable());
  }

  onSubmit() {
    console.log('new system form submitted');
    console.log(this.systemForm.get('name').value);
    console.log(this.systemForm.get('description').value);

    /* TODO Fix type errors */
    const outputVarsGroup: FormArray = this.systemForm.get('intputVariables');
    const outputVars: FormArray = outputVarsGroup.controls;

    for (let input of this.systemForm.get('inputVariables').controls as FormArray) {
      console.log(input.get('name').value);
    }

    for (let output of this.systemForm.get('outputVariables').controls as FormArray) {
      console.log(output.get('name').value);
    }

  }
}
