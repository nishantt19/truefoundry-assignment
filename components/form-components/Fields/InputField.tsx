"use client";
import React, { useState } from "react";
import { useFormContext } from "@/context/FormContext";
import { IoInformationCircle } from "react-icons/io5";
import Tooltip from "@/components/Tooltip";

interface InputFieldProps {
  label: string;
  jsonKey: string;
  placeholder?: string;
  required?: boolean;
  disable?: boolean;
  description: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  jsonKey,
  placeholder,
  required,
  disable,
  description,
}) => {
  const { updateFormData } = useFormContext();
  const [value, setValue] = useState("");

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
      <input
        id={jsonKey}
        required={required}
        disabled={disable}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          updateFormData(jsonKey, e.target.value);
        }}
        className={`text-[#768fb8] p-2 m-2 w-[50%] bg-[#eff7ff] border-[#dee9f8] rounded-md border ${
          disable && "bg-[#eff7ff]/10"
        }`}
        type="text"
        placeholder={placeholder || ""}
      />
    </>
  );
};

export default InputField;
