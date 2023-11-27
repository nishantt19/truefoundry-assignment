import React from "react";
import { Switch } from "@nextui-org/react";

interface SwitchButtonProps {
  isRequired: boolean;
  setIsRequired: React.Dispatch<React.SetStateAction<boolean>>;
}

const SwitchButton: React.FC<SwitchButtonProps> = ({
  isRequired,
  setIsRequired,
}) => {
  return (
    <div className="my-3 w-[96%] mx-auto">
      <span className="font-medium">Show Advance Options</span>
      <span className="ml-3">
        <Switch
          checked={isRequired}
          onChange={() => setIsRequired(!isRequired)}
        />
      </span>
    </div>
  );
};

export default SwitchButton;
