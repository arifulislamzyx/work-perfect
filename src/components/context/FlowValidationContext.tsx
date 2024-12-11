import { AppNodeMissingInputs } from "@/type/appNode";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type FlowValidatioContextType = {
  invalidInputs: AppNodeMissingInputs[];
  setInvalidInputs: Dispatch<SetStateAction<AppNodeMissingInputs[]>>;
  clearErrors: () => void;
};

export const FlowValidatioContext =
  createContext<FlowValidatioContextType | null>(null);

export const FlowValidatioContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [invalidInputs, setInvalidInputs] = useState<AppNodeMissingInputs[]>(
    []
  );
  const clearErrors = () => {
    setInvalidInputs([]);
  };
  return (
    <FlowValidatioContext.Provider
      value={{
        invalidInputs,
        setInvalidInputs,
        clearErrors,
      }}
    >
      {children}
    </FlowValidatioContext.Provider>
  );
};
