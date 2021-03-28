interface IMeal {
  type: string;
  value: string;
  editable?: boolean;
}

export interface IPlanDay {
  date: string;
  meals: Array<IMeal>;
}
