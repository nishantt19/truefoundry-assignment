"use client";
import React, { useEffect } from "react";
import { Field } from "@/utils/types";
import GroupField from "./GroupField";
import { useFormContext } from "@/context/FormContext";

interface IgnoreFieldProps {
  field: Field;
}

const IgnoreField: React.FC<IgnoreFieldProps> = ({ field }) => {
  const { selectedValue, removeFormData } = useFormContext();

  useEffect(() => {
    if (field.uiType === "Ignore") {
      field.subParameters?.forEach((subField) => {
        removeFormData(subField.jsonKey);
      });
    }
  }, [selectedValue]);
  return (
    <>
      {field.uiType === "Ignore" &&
        field.conditions.some((condition) => {
          return (
            condition.jsonKey === "pizza_type.type" &&
            condition.op === "==" &&
            condition.action === "enable" &&
            condition.value === selectedValue
          );
        }) &&
        field.subParameters &&
        field.subParameters
          .filter((subField) => subField.validate.required === true)
          .map((subField, subIndex) => {
            return (
              <div key={subIndex} className="mt-3">
                <GroupField subField={subField} />
              </div>
            );
          })}
    </>
  );
};

export default IgnoreField;
