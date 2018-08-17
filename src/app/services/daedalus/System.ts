
import {InputVariable} from './InputVariable';
import {OutputVariable} from './OutputVariable';
import {DataSet} from './DataSet';

export interface System {
  id: number;
  name: string;
  description: string;
  input_variables: InputVariable[];
  output_variables: OutputVariable[];
  created: Date;
  updated: Date;
  datasets?: DataSet[];
}
