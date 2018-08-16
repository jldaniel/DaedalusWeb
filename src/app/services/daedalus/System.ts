
import {InputVariable} from './InputVariable';
import {OutputVariable} from './OutputVariable';

export interface System {
  id: number;
  name: string;
  description: string;
  input_variables: InputVariable[];
  output_variables: OutputVariable[];
}
