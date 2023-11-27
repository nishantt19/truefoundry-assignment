export interface Option {
  label: string;
  value: string;
  description?: string;
  icon?: string;
}

export interface Condition {
  jsonKey: string;
  op: string;
  value: string;
  action: string;
}

interface BaseField {
  uiType: string;
  sort: number;
  jsonKey: string;
  label: string;
  description: string;
  placeholder?: string;
  subParameters?: Field[];
  disable?: boolean;
}

interface SwitchField extends BaseField {
  uiType: "Switch";
  validate: {
    required?: boolean;
    defaultValue: boolean;
    options?: Option[];
  };
}

interface IgnoreField extends BaseField {
  uiType: "Ignore";
  validate: {
    required?: boolean;
  };
  conditions: Condition[];
}

interface OtherField extends BaseField {
  uiType: "Input" | "Group" | "Radio" | "Select";
  validate: {
    required?: boolean;
    defaultValue?: string;
    options?: Option[];
  };
}

export type Field = SwitchField | OtherField | IgnoreField;
