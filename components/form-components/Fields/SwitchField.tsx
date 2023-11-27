"use client";
import React, { useState, useEffect } from "react";
import { Checkbox } from "@nextui-org/react";
import { useFormContext } from "@/context/FormContext";
import { IoInformationCircle } from "react-icons/io5";
import Tooltip from "@/components/Tooltip";

interface SwitchFieldProps {
  label: string;
  defaultValue: boolean;
  jsonKey: string;
  required?: boolean;
  description: string;
}

const SwitchField: React.FC<SwitchFieldProps> = ({
  label,
  defaultValue,
  jsonKey,
  required,
  description,
}) => {
  const { updateFormData } = useFormContext();
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    updateFormData(jsonKey, defaultValue);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.checked);
    updateFormData(jsonKey, e.target.checked);
  };

  return (
    <>
      <Checkbox
        className="mt-3"
        onValueChange={setValue}
        onChange={handleChange}
        isRequired={required}
        isSelected={value}
        color="default"
      >
        {label}
        {required && <span className="text-red-500">*</span>}
        {description.length > 0 && (
          <Tooltip text={description}>
            <IoInformationCircle className="inline ml-2" />
          </Tooltip>
        )}
      </Checkbox>
    </>
  );
};

export default SwitchField;
