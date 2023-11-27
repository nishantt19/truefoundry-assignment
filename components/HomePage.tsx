"use client";
import React from "react";
import Form from "@/components/Form";
import JsonEditor from "@/components/JsonEditor";
import { useFormContext } from "@/context/FormContext";

const HomePage = () => {
  const { formSchema, inputValue } = useFormContext();

  return (
    <>
      <JsonEditor />
      {/* @ts-ignore */}
      {formSchema && formSchema.length > 0 && inputValue.length > 0 && (
        <Form schema={formSchema} />
      )}
    </>
  );
};

export default HomePage;
