

export interface DataSet {
  id: number;
  description: string;
  created: Date;
  system_id: number;
  runs: number;
  data?: Data;
}


export interface Data {
  inputs: InputData[];
  outputs: OutputData[];
}

export interface InputData {
  name: string;
  values: number[];
}

export interface OutputData {
  name: string;
  values: number[];
}
