"use client";
import React, { use, useEffect, useState } from "react";
import { Option } from "@/utils/types";
import { useFormContext } from "@/context/FormContext";

interface RadioFieldProps {
  options: Option[];
  jsonKey: string;
  required?: boolean;
  defaultValue?: string;
}

const RadioField: React.FC<RadioFieldProps> = ({
  options,
  jsonKey,
  required,
  defaultValue,
}) => {
  const { updateFormData, selectedValue, updateSelectedValue } =
    useFormContext();

  const handleButtonClick = (value: string) => {
    updateSelectedValue(value);
    updateFormData(jsonKey, value);
  };

  useEffect(() => {
    if (required) {
      updateFormData(jsonKey, defaultValue);
    }
    updateSelectedValue(defaultValue);
  }, []);

  return (
    <>
      {options.map((option, optionIndex) => (
        <button
          key={optionIndex}
          className={`text-[#768fb8] p-2 m-2 w-[50%] ${
            selectedValue === option.value
              ? "bg-[#dfecfd] border-[#a79eeb]"
              : "bg-[#eff7ff] border-[#dee9f8]"
          }  rounded-md border`}
          value={option.value}
          onClick={() => handleButtonClick(option.value)}
          type="button"
        >
          {option.label}
        </button>
      ))}
    </>
  );
};

export default RadioField;

// #dfecfd
// #a79eeb
