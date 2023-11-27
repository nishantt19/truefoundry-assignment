"use client";
import React, { useEffect, useState } from "react";
import { Field } from "@/utils/types";
import { useFormContext } from "@/context/FormContext";
import { Toaster, toast } from "sonner";

const JsonEditor = () => {
  const [error, setError] = useState<string | null>(null);

  const { updateFormSchema, formSchema, inputValue, updateInputValue } =
    useFormContext();

  useEffect(() => {
    if (inputValue.length === 0) {
      updateFormSchema([]);
    }
  }, [inputValue]);

  const validateField = (field: any): field is Field => {
    // Check if the field matches the Field type
    return (
      "uiType" in field &&
      "sort" in field &&
      "jsonKey" in field &&
      "label" in field &&
      "validate" in field
      // Add more conditions based on your requirements
    );
  };

  const validateAndSetSchema = () => {
    if (inputValue.length === 0) {
      updateFormSchema([]);
      return;
    }

    try {
      const parsedInput = JSON.parse(inputValue);

      // Check if parsed input matches the Field type
      if (Array.isArray(parsedInput)) {
        const isValid = parsedInput.every((field) => validateField(field));
        if (isValid) {
          updateFormSchema(parsedInput);
        } else {
          setError("Given input is not a valid UI Schema.");
          updateFormSchema([]);
          toast.error("Given input is not a valid UI Schema.");
        }
      } else {
        setError("Input must be a valid array.");
        updateFormSchema([]);
        toast.error("Input must be a valid array.");
      }
    } catch (e) {
      setError("Input is not a valid JSON.");
      updateFormSchema([]);
      toast.error("Input is not a valid JSON object.");
    }
  };

  return (
    <>
      <div className="w-[50vw] h-[90vh] mr-3 relative">
        <div className="flex flex-col w-full h-full overflow-auto">
          <label htmlFor="json-editor" className="font-medium text-lg">
            Paste your JSON here
          </label>
          <textarea
            id="json-editor"
            className="w-full h-full p-2 border-[#2971d2] border-2 rounded-lg bg-[#eff7ff]/10"
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              updateInputValue(e.target.value)
            }
          />
        </div>
        <div>
          <button
            onClick={validateAndSetSchema}
            className="absolute bottom-4 right-3 px-3 py-2 bg-[#2971d2] rounded-md text-white font-medium"
          >
            Render Form
          </button>
        </div>
      </div>
    </>
  );
};

export default JsonEditor;
