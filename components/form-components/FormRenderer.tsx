import React from "react";
import { Field } from "@/utils/types";
import InputField from "./Fields/InputField";
import SelectField from "./Fields/SelectField";
import GroupField from "./Groups/GroupField";
import SwitchButton from "./SwitchButton";
import { formatLabel } from "@/utils/utils";
import SwitchField from "./Fields/SwitchField";
import RadioField from "./Fields/RadioField";

interface FormFieldRendererProps {
  schema: Field[];
  isRequired: boolean;
  setIsRequired: React.Dispatch<React.SetStateAction<boolean>>;
  isSelectRequired: boolean;
}

const FormRenderer: React.FC<FormFieldRendererProps> = ({
  schema,
  isRequired,
  setIsRequired,
  isSelectRequired,
}) => {
  const sortedSchema = schema
    .slice()
    .sort((a, b) => (a.sort || 0) - (b.sort || 0));
  return (
    <>
      {sortedSchema.map((field, index) => {
        return (
          <div key={index}>
            {field.uiType === "Input" && (
              <div className="flex justify-between items-center px-3 py-2 bg-[#fafdff] rounded-lg w-[96%] border-[#f0f6fe] border mx-auto my-3">
                <InputField
                  jsonKey={field.jsonKey}
                  label={formatLabel(field.label)}
                  placeholder={field.placeholder}
                  required={field.validate.required}
                  description={field.description}
                />
              </div>
            )}

            {field.uiType === "Select" &&
              field.validate.options &&
              field.validate.required === true && (
                <div className="flex justify-between items-center px-3 py-2 bg-[#fafdff] rounded-lg w-[96%] border-[#f0f6fe] border mx-auto my-3">
                  <SelectField
                    jsonKey={field.jsonKey}
                    label={formatLabel(field.label)}
                    options={field.validate.options}
                    defaultValue={field.validate.defaultValue}
                    required={field.validate.required}
                    description={field.description}
                  />
                </div>
              )}
            {isSelectRequired &&
              field.uiType === "Select" &&
              field.validate.options &&
              !("required" in field.validate) && (
                <div className="flex justify-between items-center px-3 py-2 bg-[#fafdff] rounded-lg w-[96%] border-[#f0f6fe] border mx-auto my-3">
                  <SelectField
                    jsonKey={field.jsonKey}
                    label={formatLabel(field.label)}
                    options={field.validate.options}
                    defaultValue={field.validate.defaultValue}
                    required={field.validate.required}
                    description={field.description}
                  />
                </div>
              )}

            {field.uiType === "Group" && field.subParameters && (
              <div className="flex flex-col justify-between bg-[#fafdff] rounded-lg w-[96%] border-[#f0f6fe] border mx-auto my-3">
                <h1 className="font-medium px-3 py-2">
                  {formatLabel(field.label)}
                </h1>
                <div className="w-[98%] px-3 h-[1px] mx-auto bg-black/10"></div>
                <div className="my-3">
                  {field.subParameters
                    .slice()
                    .sort((a, b) => (a.sort || 0) - (b.sort || 0))
                    .filter((subField) => subField.validate.required === true)
                    .map((subField, subIndex) => {
                      return (
                        <div key={subIndex}>
                          <GroupField subField={subField} />
                        </div>
                      );
                    })}
                  {isRequired &&
                    field.subParameters
                      .filter((subField) => !("required" in subField.validate))
                      .map((subField, subIndex) => {
                        return (
                          <div key={subIndex} className="mt-3">
                            <GroupField subField={subField} />
                          </div>
                        );
                      })}
                </div>
                {field.subParameters.some(
                  (subField) => !("required" in subField.validate)
                ) && (
                  <SwitchButton
                    isRequired={isRequired}
                    setIsRequired={setIsRequired}
                  />
                )}
              </div>
            )}

            {field.uiType === "Switch" && field.validate.required === true && (
              <div className="flex justify-between items-center px-3 py-2 bg-[#fafdff] rounded-lg w-[96%] border-[#f0f6fe] border mx-auto my-3">
                <SwitchField
                  label={formatLabel(field.label)}
                  defaultValue={field.validate.defaultValue}
                  jsonKey={field.jsonKey}
                  required={field.validate.required}
                  description={field.description}
                />
              </div>
            )}
            {field.uiType === "Radio" &&
              field.validate.options &&
              field.validate.required === true && (
                <div className="flex justify-between items-center px-3 py-2 bg-[#fafdff] rounded-lg w-[96%] border-[#f0f6fe] border mx-auto my-3">
                  <RadioField
                    options={field.validate.options}
                    jsonKey={field.jsonKey}
                    required={field.validate.required}
                    defaultValue={field.validate.defaultValue}
                  />
                </div>
              )}
          </div>
        );
      })}
    </>
  );
};

export default FormRenderer;
