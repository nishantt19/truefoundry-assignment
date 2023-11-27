"use client";
import { Field } from "@/utils/types";
import React from "react";
import { formatLabel } from "@/utils/utils";
import InputField from "../Fields/InputField";
import SelectField from "../Fields/SelectField";
import SwitchField from "../Fields/SwitchField";
import RadioField from "../Fields/RadioField";
import IgnoreField from "./IgnoreField";

interface GroupFieldProps {
  subField: Field;
}

const GroupField: React.FC<GroupFieldProps> = ({ subField }) => {
  return (
    <>
      {subField.uiType === "Input" && (
        <div className="flex justify-between items-center mx-auto w-[96%]">
          <InputField
            jsonKey={subField.jsonKey}
            label={formatLabel(subField.label)}
            placeholder={subField.placeholder}
            required={subField.validate.required}
            disable={subField.disable}
            description={subField.description}
          />
        </div>
      )}
      {subField.uiType === "Switch" && (
        <div className="flex justify-between items-center mx-auto w-[96%]">
          <SwitchField
            jsonKey={subField.jsonKey}
            label={formatLabel(subField.label)}
            defaultValue={subField.validate.defaultValue}
            required={subField.validate.required}
            description={subField.description}
          />
        </div>
      )}
      {subField.uiType === "Select" && subField.validate.options && (
        <div className="flex justify-between items-center mx-auto w-[96%]">
          <SelectField
            jsonKey={subField.jsonKey}
            label={formatLabel(subField.label)}
            options={subField.validate.options}
            defaultValue={subField.validate.defaultValue}
            required={subField.validate.required}
            description={subField.description}
          />
        </div>
      )}
      {subField.uiType === "Radio" && subField.validate.options && (
        <div className="flex justify-between items-center mx-auto w-[96%]">
          <RadioField
            jsonKey={subField.jsonKey}
            options={subField.validate.options}
            defaultValue={subField.validate.defaultValue}
          />
        </div>
      )}
      <IgnoreField field={subField} />
    </>
  );
};

export default GroupField;
