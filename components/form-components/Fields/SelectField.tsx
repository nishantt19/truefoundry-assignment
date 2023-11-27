"use client";
import React, { useState, useEffect } from "react";
import { Option } from "@/utils/types";
import { useFormContext } from "@/context/FormContext";
import { IoInformationCircle } from "react-icons/io5";
import Tooltip from "@/components/Tooltip";

interface SelectFieldProps {
  label: string;
  jsonKey: string;
  defaultValue?: string;
  options: Option[];
  required?: boolean;
  description: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  jsonKey,
  defaultValue,
  options,
  required,
  description,
}) => {
  const { updateFormData } = useFormContext();
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    if (required) {
      updateFormData(jsonKey, defaultValue);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    updateFormData(jsonKey, e.target.value);
  };

  return (
    <>
      <label className="font-medium" htmlFor={jsonKey}>
        {label}
        {required && <span className="text-red-500">*</span>}
        {description.length > 0 && (
          <Tooltip text={description}>
            <IoInformationCircle className="inline ml-2" />
          </Tooltip>
        )}
      </label>
      <select
        onChange={handleChange}
        required={required}
        value={value}
        id={jsonKey}
        className="text-[#768fb8] py-2 px-3 m-2 w-[50%] bg-[#eff7ff] border-[#dee9f8] rounded-md border]"
      >
        {options.map((option, optionIndex) => (
          <option key={optionIndex} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default SelectField;
