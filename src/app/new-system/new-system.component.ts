import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';

import { InputVariable } from '../services/daedalus/InputVariable';
import { OutputVariable } from '../services/daedalus/OutputVariable';
import { System } from '../services/daedalus/System';
import { DaedalusService } from '../services/daedalus/daedalus.service';
import { Router } from '@angular/router';

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

  /* Workaround for form types */
  getControls(frmGrp: FormGroup, key: string) {
    return (<FormArray>frmGrp.controls[key]).controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private daedalus: DaedalusService,
    private router: Router) {
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
      name: '',
      description: ''
    });
  }

  createOutputVariable(): FormGroup {
    return this.formBuilder.group({
      name: '',
      description: ''
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


    for (const input of (<FormArray>this.systemForm.get('inputVariables')).controls) {
      console.log(input.get('name').value);
    }

    for (const output of (<FormArray>this.systemForm.get('outputVariables')).controls) {
      console.log(output.get('name').value);
    }

    /* Build the system from the form */
    const system = <System>{};
    system.name = this.systemForm.get('name').value;
    system.description = this.systemForm.get('description').value;

    const input_variables: InputVariable[] = [];
    for (const input of (<FormArray>this.systemForm.get('inputVariables')).controls) {
      const inputVariable = <InputVariable>{};
      inputVariable.name = input.get('name').value;
      inputVariable.description = input.get('description').value;

      input_variables.push(inputVariable);
    }

    system.input_variables = input_variables;

    const output_variables: OutputVariable[] = [];
    for (const output of (<FormArray>this.systemForm.get('outputVariables')).controls) {
      const outputVariable = <OutputVariable>{};
      outputVariable.name = output.get('name').value;
      outputVariable.description = output.get('description').value;

      output_variables.push(outputVariable);
    }

    system.output_variables = output_variables;

    /* Submit the system */
    this.daedalus.createSystem(system).subscribe( data => {
      console.log('New System Created');
      console.log(data);
      this.router.navigate(['/systems']);
    });



  }


}
