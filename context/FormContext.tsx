import React, { createContext, useContext, useState, ReactNode } from "react";
import { Field } from "@/utils/types";

// Define the type for form data
interface FormData {
  [key: string]: any;
}

// Define the context type
interface FormContextType {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  updateFormData: (jsonKey: string, value: any) => void;
  handleResetData: () => void;
  selectedValue?: string;
  setSelectedValue?: React.Dispatch<React.SetStateAction<string>>;
  updateSelectedValue: (value: any) => void;
  removeFormData: (key: string) => void;
  formSchema?: Field[] | null;

  updateFormSchema: (schema: Field[]) => void;
  inputValue: string;
  updateInputValue: (value: string) => void;
}

// Create a context for managing form data and functions
const FormContext = createContext<FormContextType | undefined>(undefined);

// Create a custom hook to use the FormContext
export const useFormContext = () => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error("useFormContext must be used within a FormContextProvider");
  }

  return context;
};

// Create a FormContextProvider component
interface FormContextProviderProps {
  children: ReactNode;
}

export const FormContextProvider: React.FC<FormContextProviderProps> = ({
  children,
}) => {
  const [formData, setFormData] = useState<FormData>({});
  const [selectedValue, setSelectedValue] = useState<string | undefined>("");
  const [formSchema, setFormSchema] = useState<Field[] | null>(null);
  const [inputValue, setInputValue] = useState<string>("");

  const updateInputValue = (value: string) => {
    setInputValue(value);
  };

  const updateFormData = (jsonKey: string, value: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [jsonKey]: value,
    }));
  };

  const updateFormSchema = (schema: Field[]) => {
    setFormSchema(schema);
  };

  const updateSelectedValue = (value: any) => {
    setSelectedValue(value);
  };

  const handleResetData = () => {
    setFormData({});
  };

  const removeFormData = (key: any) => {
    setFormData((prev) => {
      const newState = { ...prev };
      delete newState[key];
      return newState;
    });
  };

  // Pass the form data and functions as values to the context
  const contextValue: FormContextType = {
    formData,
    setFormData,
    updateFormData,
    handleResetData,
    selectedValue,
    updateSelectedValue,
    removeFormData,
    formSchema,
    updateFormSchema,
    inputValue,
    updateInputValue,
  };

  return (
    <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
  );
};
