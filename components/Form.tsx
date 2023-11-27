"use client";
import React, { useState } from "react";
import { Field } from "@/utils/types";
import FormRenderer from "./form-components/FormRenderer";
import { useFormContext } from "@/context/FormContext";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import SwitchButton from "./form-components/SwitchButton";
import { toast } from "sonner";

interface FormProps {
  schema: Field[];
}

const Form: React.FC<FormProps> = ({ schema }) => {
  const [isRequired, setIsRequired] = useState(false);
  const [isSelectRequired, setIsSelectRequired] = useState(false);
  const [submittedData, setSubmittedData] = useState({});
  const { formData, handleResetData } = useFormContext();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmittedData(formData); // store the submitted data
    onOpen();
  };

  return (
    <>
      <div className="w-full h-[90vh] flex justify-center items-center border-[#2971d2] border-2 rounded-lg">
        <div className="w-full h-full ">
          <div>
            <div className="w-[96%] px-3 h-[1px] mt-6 mx-auto bg-black/10"></div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-between h-full w-full"
          >
            <div className="w-full h-[90%] overflow-auto">
              <FormRenderer
                schema={schema}
                isRequired={isRequired}
                isSelectRequired={isSelectRequired}
                setIsRequired={setIsRequired}
              />
            </div>
            <div className="mb-8">
              <div className="w-[96%] px-3 h-[1px] mb-2 mx-auto bg-black/10"></div>
              <div className="w-[96%] mx-auto flex justify-between items-end">
                <SwitchButton
                  isRequired={isSelectRequired}
                  setIsRequired={setIsSelectRequired}
                />
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      handleResetData();
                      toast.success("Form Reset Successfully");
                    }}
                    className="text-[#e50101] bg-[#feeff0] px-4 py-2 rounded-md mr-3"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="text-white bg-[#2971d2] px-4 py-2 rounded-md"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>
            Submitted JSON Data to be sent to the backend
          </ModalHeader>
          <ModalBody>
            <p className="text-center">
              {JSON.stringify(submittedData, null, 2)}
            </p>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Form;
